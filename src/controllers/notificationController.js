const Notification = require('../models/notificationModel');

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;
        const notification = await Notification.create({ sender, receiver, message });
        res.status(201).json({ status: 'success', data: notification });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json({ status: 'success', data: notifications });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Get a single notification by ID
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ status: 'fail', message: 'Notification not found' });
        }
        res.status(200).json({ status: 'success', data: notification });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Update a notification by ID
exports.updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!notification) {
            return res.status(404).json({ status: 'fail', message: 'Notification not found' });
        }
        res.status(200).json({ status: 'success', data: notification });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Delete a notification by ID
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ status: 'fail', message: 'Notification not found' });
        }
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
