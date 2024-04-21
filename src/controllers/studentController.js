const Student = require('../models/Student');
const Course = require('../models/Course');

// Enroll student in a course
exports.enrollInCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        // Check if student and course exist
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);
        if (!student || !course) {
            return res.status(404).json({ error: 'Student or course not found' });
        }

        // Check if student is already enrolled in the course
        if (student.courses.includes(courseId)) {
            return res.status(400).json({ error: 'Student is already enrolled in this course' });
        }

        // Enroll student in the course
        student.courses.push(courseId);
        await student.save();

        res.status(200).json({ message: 'Student enrolled in course successfully', student });
    } catch (error) {
        console.error('Error in enrollInCourse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// View enrolled courses of a student
exports.viewEnrolledCourses = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Check if student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Populate enrolled courses details
        await student.populate('courses').execPopulate();

        res.status(200).json({ enrolledCourses: student.courses });
    } catch (error) {
        console.error('Error in viewEnrolledCourses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
