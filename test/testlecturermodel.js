const mongoose = require('mongoose');
const Lecturer = require('../src/models/Lecturer');

describe('Lecturer Model CRUD Operations', () => {

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
        // Clear the Lecturer collection after each test
        await Lecturer.deleteMany({});
    });

    it('should create a new lecturer', async () => {
        // Create a sample lecturer
        const lecturerData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            department: 'Computer Science',
            qualification: 'Ph.D. in Computer Science',
            contactNumber: '1234567890',
            address: '123 Main Street, City',
            nic: '123456789X',
        };

        // Save the lecturer to the database
        const lecturer = new Lecturer(lecturerData);
        const savedLecturer = await lecturer.save();

        // Check if the lecturer is saved successfully
        expect(savedLecturer._id).toBeDefined();
        expect(savedLecturer.name).toBe(lecturerData.name);
        expect(savedLecturer.email).toBe(lecturerData.email);
        expect(savedLecturer.department).toBe(lecturerData.department);
        expect(savedLecturer.qualification).toBe(lecturerData.qualification);
        expect(savedLecturer.contactNumber).toBe(lecturerData.contactNumber);
        expect(savedLecturer.address).toBe(lecturerData.address);
        expect(savedLecturer.nic).toBe(lecturerData.nic);
    });

    it('should retrieve a list of lecturers', async () => {
        // Create sample lecturers
        const lecturerData1 = { name: 'John Doe', email: 'johndoe@example.com', department: 'Computer Science', qualification: 'Ph.D.', contactNumber: '1234567890', address: '123 Main Street', nic: '123456789X' };
        const lecturerData2 = { name: 'Jane Smith', email: 'janesmith@example.com', department: 'Physics', qualification: 'M.Sc.', contactNumber: '9876543210', address: '456 Elm Street', nic: '987654321Y' };

        // Save the lecturers to the database
        await Lecturer.create(lecturerData1, lecturerData2);

        // Retrieve all lecturers from the database
        const lecturers = await Lecturer.find();

        // Check if the correct number of lecturers are retrieved
        expect(lecturers).toHaveLength(2);
    });

    it('should update an existing lecturer', async () => {
        // Create a sample lecturer
        const lecturerData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            department: 'Computer Science',
            qualification: 'Ph.D. in Computer Science',
            contactNumber: '1234567890',
            address: '123 Main Street, City',
            nic: '123456789X',
        };

        // Save the lecturer to the database
        const lecturer = await Lecturer.create(lecturerData);

        // Update the lecturer's department
        const updatedLecturer = await Lecturer.findByIdAndUpdate(lecturer._id, { department: 'Information Technology' }, { new: true });

        // Check if the lecturer is updated successfully
        expect(updatedLecturer.department).toBe('Information Technology');
    });

    it('should delete a lecturer', async () => {
        // Create a sample lecturer
        const lecturerData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            department: 'Computer Science',
            qualification: 'Ph.D. in Computer Science',
            contactNumber: '1234567890',
            address: '123 Main Street, City',
            nic: '123456789X',
        };

        // Save the lecturer to the database
        const lecturer = await Lecturer.create(lecturerData);

        // Delete the lecturer from the database
        await Lecturer.findByIdAndDelete(lecturer._id);

        // Check if the lecturer is deleted successfully
        const deletedLecturer = await Lecturer.findById(lecturer._id);
        expect(deletedLecturer).toBeNull();
    });

    it('should retrieve a single lecturer by ID', async () => {
        // Create a sample lecturer
        const lecturerData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            department: 'Computer Science',
            qualification: 'Ph.D. in Computer Science',
            contactNumber: '1234567890',
            address: '123 Main Street, City',
            nic: '123456789X',
        };

        // Save the lecturer to the database
        const lecturer = await Lecturer.create(lecturerData);

        // Retrieve the lecturer from the database by ID
        const retrievedLecturer = await Lecturer.findById(lecturer._id);

        // Check if the correct lecturer
        expect(retrievedLecturer._id).toEqual(lecturer._id);
        expect(retrievedLecturer.name).toEqual(lecturer.name);
        expect(retrievedLecturer.email).toEqual(lecturer.email);
        expect(retrievedLecturer.department).toEqual(lecturer.department);
        expect(retrievedLecturer.qualification).toEqual(lecturer.qualification);
        expect(retrievedLecturer.contactNumber).toEqual(lecturer.contactNumber);
        expect(retrievedLecturer.address).toEqual(lecturer.address);
        expect(retrievedLecturer.nic).toEqual(lecturer.nic);
    });
});