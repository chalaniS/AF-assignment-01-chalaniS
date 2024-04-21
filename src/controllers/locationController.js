const Location = require('../models/Location');

// Create a new location
exports.createLocation = async (req, res) => {
    try {
        const { name, capacity, resources } = req.body;
        const location = new Location({ name, capacity, resources });
        const savedLocation = await location.save();
        res.status(201).json(savedLocation);
    } catch (error) {
        console.error('Error creating location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all locations
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        console.error('Error getting all locations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single location by ID
exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json(location);
    } catch (error) {
        console.error('Error getting location by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a location by ID
exports.updateLocationById = async (req, res) => {
    try {
        const { name, capacity, resources } = req.body;
        const updatedLocation = await Location.findByIdAndUpdate(req.params.id, { name, capacity, resources }, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json(updatedLocation);
    } catch (error) {
        console.error('Error updating location by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a location by ID
exports.deleteLocationById = async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if (!deletedLocation) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        console.error('Error deleting location by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
