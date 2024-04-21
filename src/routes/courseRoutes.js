const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route for creating a new course
router.post('/courses', courseController.createCourse);

// Route for getting all courses
router.get('/courses', courseController.getAllCourses);

// Route for getting a single course by ID
router.get('/courses/:id', courseController.getCourseById);

// Route for updating a course
router.put('/courses/:id', courseController.updateCourse);

// Route for deleting a course
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router;
