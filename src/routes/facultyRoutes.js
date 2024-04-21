const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

// Route for creating a new faculty member
router.post('/faculty', facultyController.createFaculty);

// Route for getting all faculty members
router.get('/faculty', facultyController.getAllFaculty);

// Route for getting a single faculty member by ID
router.get('/faculty/:id', facultyController.getFacultyById);

// Route for updating a faculty member
router.put('/faculty/:id', facultyController.updateFacultyById);

// Route for deleting a faculty member
router.delete('/faculty/:id', facultyController.deleteFacultyById);

module.exports = router;
