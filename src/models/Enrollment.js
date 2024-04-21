const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
