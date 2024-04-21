const mongoose = require('mongoose');

// Define the Timetable Schema
const timetableSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer'
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

// Create the Timetable model
const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
