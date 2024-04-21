const express = require('express');
const router = express.Router();
const lecturerController = require('../controllers/lecturerController');

// Route for creating a new lecturer
router.post('/lecturer', lecturerController.createLecturer);

// Route for getting all lecturers
router.get('/lecturer', lecturerController.getAllLecturers);

// Route for getting a single lecturer by ID
router.get('/lecturer/:id', lecturerController.getLecturerById);

// Route for updating a lecturer
router.put('/lecturer/:id', lecturerController.updateLecturerById);

// Route for deleting a lecturer
router.delete('/lecturer/:id', lecturerController.deleteLecturerById);

module.exports = router;
