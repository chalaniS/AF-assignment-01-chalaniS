const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    resources: {
        type: [String], // Assuming resources are stored as an array of strings
        default: [] // You can set a default value if needed
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
