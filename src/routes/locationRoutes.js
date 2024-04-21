const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Route for creating a new location
router.post('/location', locationController.createLocation);

// Route for getting all locations
router.get('/location', locationController.getAllLocations);

// Route for getting a single location by ID
router.get('/location/:id', locationController.getLocationById);

// Route for updating a location
router.put('/location/:id', locationController.updateLocationById);

// Route for deleting a location
router.delete('/location/:id', locationController.deleteLocationById);

module.exports = router;
