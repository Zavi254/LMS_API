const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    bookings: [{
        name: {
            type: String,
            required: true
        },
        bookingNumber: {
            type: Number,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema)