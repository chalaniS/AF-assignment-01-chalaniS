const mongoose = require('mongoose');

// Define the Course Schema
const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    credits: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    }
});

// Create the Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
