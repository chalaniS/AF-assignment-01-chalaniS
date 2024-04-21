const mongoose = require('mongoose');
const Booking = require('../src/models/Booking');

describe('Booking Model', () => {
    beforeAll(async () => {
        const mongoURI = process.env.TestmongoURI;

        // Connect to a test database before running the tests
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    });

    afterAll(async () => {
        // Disconnect from the MongoDB database
        await mongoose.connection.close();
    });

    afterEach(async () => {
        // Clear the Booking collection after each test
        await Booking.deleteMany({});
    });

    it('should create a new booking', async () => {
        // Create a sample booking
        const bookingData = {
            userId: mongoose.Types.ObjectId(),
            courseId: mongoose.Types.ObjectId(),
            timetableId: mongoose.Types.ObjectId(),
            locationId: mongoose.Types.ObjectId(),
            date: new Date('2024-03-20'),
            startTime: '09:00 AM',
            endTime: '11:00 AM'
        };

        // Save the booking to the database
        const booking = new Booking(bookingData);
        const savedBooking = await booking.save();

        // Check if the booking is saved successfully
        expect(savedBooking._id).toBeDefined();
        expect(savedBooking.userId).toEqual(bookingData.userId);
        expect(savedBooking.courseId).toEqual(bookingData.courseId);
        expect(savedBooking.timetableId).toEqual(bookingData.timetableId);
        expect(savedBooking.locationId).toEqual(bookingData.locationId);
        expect(savedBooking.date).toEqual(bookingData.date);
        expect(savedBooking.startTime).toEqual(bookingData.startTime);
        expect(savedBooking.endTime).toEqual(bookingData.endTime);
        expect(savedBooking.bookedAt).toBeDefined();

        // Print success message to console
        console.log('Booking created successfully:', savedBooking._id);
    });
});
