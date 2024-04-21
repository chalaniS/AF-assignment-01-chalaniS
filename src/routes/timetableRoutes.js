const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticationMiddleware');

const timetableController = require('../controllers/timetableController');

// Apply authentication middleware
router.use(authenticateUser);

// Route for creating a new timetable entry
router.post('/timetable', timetableController.createTimetable);

// Route for getting all timetable entries
router.get('/timetable', timetableController.getAllTimetables);

// Route for getting a single timetable entry by ID
router.get('/timetable/:id', timetableController.getTimetableById);

// Route for updating a timetable entry
router.put('/timetable/:id', timetableController.updateTimetable);

// Route for deleting a timetable entry
router.delete('/timetable/:id', timetableController.deleteTimetable);

module.exports = router;
