const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')

router.get('/today', bookingController.getTodayBookings)
router.post('/book', bookingController.bookLeave)
router.delete('/cancel/:bookingNumber', bookingController.cancelBooking)


module.exports = router
