const Timetable = require('../models/Timetable');
const notificationService = require('../service/notificationService');

// Create a new timetable entry
exports.createTimetable = async (req, res) => {
    try {
        const { course, day, startTime, endTime, faculty, lecturer, location } = req.body;
        const newTimetable = new Timetable({ course, day, startTime, endTime, faculty, lecturer, location });
        await newTimetable.save();
        res.status(201).json({ message: 'Timetable entry created successfully', timetable: newTimetable });
    } catch (error) {
        console.error('Error in createTimetable:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all timetable entries
exports.getAllTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.find();
        res.status(200).json({ timetables });
    } catch (error) {
        console.error('Error in getAllTimetables:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single timetable entry by ID
exports.getTimetableById = async (req, res) => {
    try {
        const { id } = req.params;
        const timetable = await Timetable.findById(id);
        if (!timetable) {
            return res.status(404).json({ error: 'Timetable entry not found' });
        }
        res.status(200).json({ timetable });
    } catch (error) {
        console.error('Error in getTimetableById:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a timetable entry
exports.updateTimetable = async (req, res) => {
    try {
        const { id } = req.params;
        const { course, day, startTime, endTime, faculty, lecturer, location, lecturerId } = req.body;

        // Check if all required fields are provided
        if (!id || !course || !day || !startTime || !endTime || !faculty || !lecturer || !location || !lecturerId) {
            console.error('Error in updateTimetable: Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Update the timetable entry
        const updatedTimetable = await Timetable.findByIdAndUpdate(id, { course, day, startTime, endTime, faculty, lecturer, location }, { new: true });

        // Check if the timetable entry exists
        if (!updatedTimetable) {
            return res.status(404).json({ error: 'Timetable entry not found' });
        }

        // Send notification to the lecturer
        const userId = req.user ? req.user._id : null;
        await notificationService.createNotification(userId, lecturerId, 'Timetable has been updated.');

        // Respond with the updated timetable entry
        res.status(200).json({ message: 'Timetable entry updated successfully', timetable: updatedTimetable });
    } catch (error) {
        console.error('Error in updateTimetable:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




// Delete a timetable entry
exports.deleteTimetable = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTimetable = await Timetable.findByIdAndDelete(id);
        if (!deletedTimetable) {
            return res.status(404).json({ error: 'Timetable entry not found' });
        }
        res.status(200).json({ message: 'Timetable entry deleted successfully' });
    } catch (error) {
        console.error('Error in deleteTimetable:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
