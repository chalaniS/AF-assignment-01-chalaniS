
const Enrollment = require('../models/Enrollment');

// Create a new enrollment
exports.createEnrollment = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const newEnrollment = new Enrollment({ studentId, courseId });
        await newEnrollment.save();
        res.status(201).json({ message: 'Enrollment created successfully', enrollment: newEnrollment });
    } catch (error) {
        console.error('Error in createEnrollment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        res.status(200).json({ enrollments });
    } catch (error) {
        console.error('Error in getAllEnrollments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get enrollments by student ID
exports.getEnrollmentsByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        const enrollments = await Enrollment.find({ studentId });
        res.status(200).json({ enrollments });
    } catch (error) {
        console.error('Error in getEnrollmentsByStudentId:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get enrollments by course ID
exports.getEnrollmentsByCourseId = async (req, res) => {
    try {
        const { courseId } = req.params;
        const enrollments = await Enrollment.find({ courseId });
        res.status(200).json({ enrollments });
    } catch (error) {
        console.error('Error in getEnrollmentsByCourseId:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an enrollment
exports.deleteEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEnrollment = await Enrollment.findByIdAndDelete(id);
        if (!deletedEnrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        console.error('Error in deleteEnrollment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
