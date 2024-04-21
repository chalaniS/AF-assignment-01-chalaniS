const Faculty = require('../models/Faculty');

// Create a new faculty member
exports.createFaculty = async (req, res) => {
    try {
        const { facultyName, headOfDepartment, username, email } = req.body;
        const faculty = new Faculty({ facultyName, headOfDepartment, username, email });
        const savedFaculty = await faculty.save();
        res.status(201).json(savedFaculty);
    } catch (error) {
        console.error('Error creating faculty:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all faculty members
exports.getAllFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find();
        res.status(200).json(faculty);


    } catch (error) {
        console.error('Error getting all faculty:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single faculty member by ID
exports.getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ error: 'Faculty member not found' });
        }
        res.status(200).json(faculty);


    } catch (error) {
        console.error('Error getting faculty by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a faculty member by ID
exports.updateFacultyById = async (req, res) => {
    try {
        const { facultyName, headOfDepartment, username, email } = req.body;
        const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, { facultyName, headOfDepartment, username, email }, { new: true });


        if (!updatedFaculty) {
            return res.status(404).json({ error: 'Faculty member not found' });
        }
        res.status(200).json(updatedFaculty);
    } catch (error) {
        console.error('Error updating faculty by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a faculty member by ID
exports.deleteFacultyById = async (req, res) => {
    try {
        const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!deletedFaculty) {
            return res.status(404).json({ error: 'Faculty member not found' });
        }
        res.status(200).json({ message: 'Faculty member deleted successfully' });

    } catch (error) {
        console.error('Error deleting faculty by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
