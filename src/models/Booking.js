const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    timetableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Timetable',
        required: true
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', // Assuming 'Location' is the model name for the location
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    bookedAt: {
        type: Date,
        default: Date.now // Automatically set to the current date and time when a booking is created
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
