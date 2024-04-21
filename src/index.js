const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
require("dotenv").config();

// Import routes
const courseRoutes = require('./routes/courseRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const locationRoutes = require('./routes/locationRoutes');
const lecturerRoutes = require('./routes/lecturerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
// const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URL;
mongoose.connect(process.env.mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));



// Routes
app.use('/timetable/api', timetableRoutes);
app.use('/course/api', courseRoutes);
app.use('/faculty/api', facultyRoutes);
app.use('/location/api', locationRoutes);
app.use('/lecturer/api', lecturerRoutes);
app.use('/booking/api', bookingRoutes);
app.use('/notification/api', notificationRoutes);
// app.use('/auth/api', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
