const Lecturer = require('../models/Lecturer');

// Create a new lecturer
exports.createLecturer = async (req, res) => {
    try {
        const { name, email, department, qualification, contactNumber, address, nic } = req.body;
        const lecturer = new Lecturer({ name, email, department, qualification, contactNumber, address, nic });
        const savedLecturer = await lecturer.save();
        res.status(201).json(savedLecturer);
    } catch (error) {
        console.error('Error creating lecturer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all lecturers
exports.getAllLecturers = async (req, res) => {
    try {
        const lecturers = await Lecturer.find();
        res.status(200).json(lecturers);
    } catch (error) {
        console.error('Error getting all lecturers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single lecturer by ID
exports.getLecturerById = async (req, res) => {
    try {
        const lecturer = await Lecturer.findById(req.params.id);
        if (!lecturer) {
            return res.status(404).json({ error: 'Lecturer not found' });
        }
        res.status(200).json(lecturer);
    } catch (error) {
        console.error('Error getting lecturer by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a lecturer by ID
exports.updateLecturerById = async (req, res) => {
    try {
        const { name, email, department, qualification, contactNumber, address, nic } = req.body;
        const updatedLecturer = await Lecturer.findByIdAndUpdate(req.params.id,
            { name, email, department, qualification, contactNumber, address, nic }, { new: true, runValidators: true });
        if (!updatedLecturer) {
            return res.status(404).json({ error: 'Lecturer not found' });
        }
        res.status(200).json(updatedLecturer);
    } catch (error) {
        console.error('Error updating lecturer by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a lecturer by ID
exports.deleteLecturerById = async (req, res) => {
    try {
        const deletedLecturer = await Lecturer.findByIdAndDelete(req.params.id);
        if (!deletedLecturer) {
            return res.status(404).json({ error: 'Lecturer not found' });
        }
        res.status(200).json({ message: 'Lecturer deleted successfully' });
    } catch (error) {
        console.error('Error deleting lecturer by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
