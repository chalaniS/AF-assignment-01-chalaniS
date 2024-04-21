const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route for creating a new booking
router.post('/booking', bookingController.createBooking);

// Route for retrieving all bookings
router.get('/booking', bookingController.getAllBookings);

// Route for retrieving a single booking by ID
router.get('/booking/:id', bookingController.getBookingById);

// Route for updating a booking by ID
router.put('/booking/:id', bookingController.updateBookingById);

// Route for deleting a booking by ID
router.delete('/booking/:id', bookingController.deleteBookingById);

module.exports = router;
