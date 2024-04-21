const Booking = require('../models/Booking');

// Controller for creating a new booking
exports.createBooking = async (req, res) => {
    try {
        const { userId, courseId, timetableId, locationId, date, startTime, endTime } = req.body;

        // Create a new booking instance
        const newBooking = new Booking({ userId, courseId, timetableId, locationId, date, startTime, endTime });

        // Save the booking to the database
        await newBooking.save();

        // Respond with success message
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error in createBooking:', error);
        // If an error occurs, respond with an error message
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller for retrieving all bookings
exports.getAllBookings = async (req, res) => {
    try {
        // Retrieve all bookings from the database
        const bookings = await Booking.find();

        // Respond with the retrieved bookings
        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error in getAllBookings:', error);
        // If an error occurs, respond with an error message
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller for retrieving a single booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;

        // Retrieve the booking with the specified ID from the database
        const booking = await Booking.findById(id);

        // If no booking is found with the specified ID, respond with a 404 error
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Respond with the retrieved booking
        res.status(200).json({ booking });
    } catch (error) {
        console.error('Error in getBookingById:', error);
        // If an error occurs, respond with an error message
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller for updating a booking by ID
exports.updateBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, courseId, timetableId, locationId, date, startTime, endTime } = req.body;

        // Find the booking with the specified ID and update its attributes
        const updatedBooking = await Booking.findByIdAndUpdate(id, { userId, courseId, timetableId, locationId, date, startTime, endTime }, { new: true });

        // If no booking is found with the specified ID, respond with a 404 error
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Respond with success message and the updated booking
        res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        console.error('Error in updateBookingById:', error);
        // If an error occurs, respond with an error message
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller for deleting a booking by ID
exports.deleteBookingById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the booking with the specified ID and delete it from the database
        const deletedBooking = await Booking.findByIdAndDelete(id);

        // If no booking is found with the specified ID, respond with a 404 error
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Respond with success message and the deleted booking
        res.status(200).json({ message: 'Booking deleted successfully', booking: deletedBooking });
    } catch (error) {
        console.error('Error in deleteBookingById:', error);
        // If an error occurs, respond with an error message
        res.status(500).json({ error: 'Internal server error' });
    }
};
