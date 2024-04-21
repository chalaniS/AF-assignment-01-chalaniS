const Course = require('../models/Course');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const { name, code, description, credits, faculty } = req.body;
        const newCourse = new Course({ name, code, description, credits, faculty });
        await newCourse.save();
        consol.log("Course created successfully" + res);
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        console.error('Error in createCourse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        consol.log("Successfully" + res);
        res.status(200).json({ courses });
    } catch (error) {
        console.error('Error in getAllCourses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        console.log("Successfully retrieved course:", course);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ course });
    } catch (error) {
        console.error('Error in getCourseById:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Update a course
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, description, credits, faculty } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(id, { name, code, description, credits, faculty }, { new: true });
        consol.log("Successfully" + res);

        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        console.error('Error in updateCourse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await Course.findByIdAndDelete(id);
        consol.log("Successfully" + res);

        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error in deleteCourse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
