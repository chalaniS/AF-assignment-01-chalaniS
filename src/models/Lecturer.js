const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String
    },
    address: {
        type: String
    },
    nic: {
        type: String,
        unique: true
    }
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

module.exports = Lecturer;
