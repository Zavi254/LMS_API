const Booking = require('../models/Booking')

exports.getBookings = async (req, res) => {
    try {
        const date = new Date(req.params.date);
        const bookingDoc = await Booking.findOne({ date });
        res.json(bookingDoc ? bookingDoc.bookings : []);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching bookings' });
    }
};


// function to book a leave
exports.bookLeave = async (req, res) => {
    const { name, date } = req.body;

    if (!name || !date) {
        return res.status(400).json({ error: 'Name and date are required' });
    }

    try {
        const bookingDate = new Date(date);
        let bookingDoc = await Booking.findOne({ date: bookingDate });

        if (!bookingDoc) {
            bookingDoc = new Booking({ date: bookingDate, bookings: [] });
        }

        if (bookingDoc.bookings.length >= 4) {
            return res.status(400).json({ error: 'Maximum bookings reached for this date' });
        }

        const newBooking = {
            name,
            bookingNumber: bookingDoc.bookings.length + 1
        };

        bookingDoc.bookings.push(newBooking);
        await bookingDoc.save();

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while booking leave' });
    }
};

// function to cancel a booking
exports.cancelLeave = async (req, res) => {
    const { name, date } = req.body;

    if (!name || !date) {
        return res.status(400).json({ error: 'Name and date are required' });
    }

    try {
        const bookingDate = new Date(date);
        const bookingDoc = await Booking.findOne({ date: bookingDate });

        if (!bookingDoc) {
            return res.status(404).json({ error: 'No bookings found for this date' });
        }

        const bookingIndex = bookingDoc.bookings.findIndex(booking => booking.name === name);

        if (bookingIndex === -1) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        bookingDoc.bookings.splice(bookingIndex, 1);
        bookingDoc.bookings.forEach((booking, index) => {
            booking.bookingNumber = index + 1;
        });

        await bookingDoc.save();

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while cancelling the booking' });
    }
};