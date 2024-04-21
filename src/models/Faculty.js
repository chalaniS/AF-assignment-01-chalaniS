const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    facultyName: {
        type: String,
        required: true
    },
    headOfDepartment: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
