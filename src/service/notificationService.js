const Notification = require('../models/notificationModel');

exports.createNotification = async (sender, receiver, message) => {
    try {
        const notification = await Notification.create({ sender, receiver, message });
        return notification;
    } catch (err) {
        throw new Error(err.message);
    }
};