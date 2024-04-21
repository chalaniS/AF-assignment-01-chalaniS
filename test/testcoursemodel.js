const mongoose = require('mongoose');
const Course = require('../src/models/Course');
const dotenv = require('dotenv');
require('dotenv').config();

describe('Course Model', () => {
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
        // Disconnect from the test database after running all tests
        await mongoose.connection.close();
    });

    afterEach(async () => {
        // Clear the Course collection after each test
        await Course.deleteMany({});
    });

    it('should create a new course', async () => {
        // Create a sample course
        const courseData = {
            code: 'CSE101',
            name: 'Introduction to Computer Science',
            description: 'An introductory course on computer science concepts',
            credits: 3,
            year: 1,
            semester: 1,
        };

        // Save the course to the database
        const course = new Course(courseData);
        const savedCourse = await course.save();

        // Check if the course is saved successfully
        expect(savedCourse._id).toBeDefined();
        expect(savedCourse.code).toBe(courseData.code);
        expect(savedCourse.name).toBe(courseData.name);
        expect(savedCourse.description).toBe(courseData.description);
        expect(savedCourse.credits).toBe(courseData.credits);
        expect(savedCourse.year).toBe(courseData.year);
        expect(savedCourse.semester).toBe(courseData.semester);

        // Print success message to console
        console.log('New course created successfully:', savedCourse._id);
    });

    it('should retrieve a list of courses', async () => {
        // Create sample courses
        const courseData = [
            {
                code: 'CSE101',
                name: 'Introduction to Computer Science',
                description: 'An introductory course on computer science concepts',
                credits: 3,
                year: 1,
                semester: 1,
            },
            {
                code: 'MAT101',
                name: 'Introduction to Mathematics',
                description: 'An introductory course on fundamental mathematical concepts',
                credits: 3,
                year: 1,
                semester: 1,
            },
        ];

        // Save the courses to the database
        await Course.create(courseData);

        // Retrieve all courses from the database
        const courses = await Course.find({});

        // Check if the courses are retrieved successfully
        expect(courses.length).toBe(courseData.length);

        // Print success message to console
        console.log('Retrieved list of courses successfully:', courses);
    });

    it('should update an existing course', async () => {
        // Create a sample course
        const courseData = {
            code: 'CSE101',
            name: 'Introduction to Computer Science',
            description: 'An introductory course on computer science concepts',
            credits: 3,
            year: 1,
            semester: 1,
        };

        // Save the course to the database
        const course = new Course(courseData);
        await course.save();

        // Update the course
        const updatedData = { description: 'Updated course description' };
        const updatedCourse = await Course.findOneAndUpdate({ code: 'CSE101' }, updatedData, { new: true });

        // Check if the course is updated successfully
        expect(updatedCourse.description).toBe(updatedData.description);

        // Print success message to console
        console.log('Updated course successfully:', updatedCourse);
    });

    it('should delete a course', async () => {
        // Create a sample course
        const courseData = {
            code: 'CSE101',
            name: 'Introduction to Computer Science',
            description: 'An introductory course on computer science concepts',
            credits: 3,
            year: 1,
            semester: 1,
        };

        // Save the course to the database
        const course = new Course(courseData);
        await course.save();

        // Delete the course
        await Course.findOneAndDelete({ code: 'CSE101' });

        // Attempt to find the deleted course
        const deletedCourse = await Course.findOne({ code: 'CSE101' });

        // Check if the course is deleted successfully
        expect(deletedCourse).toBeNull();

        // Print success message to console
        console.log('Deleted course successfully:', deletedCourse);
    });

    it('should retrieve a single course by ID', async () => {
        // Create a sample course
        const courseData = {
            code: 'CSE101',
            name: 'Introduction to Computer Science',
            description: 'An introductory course on computer science concepts',
            credits: 3,
            year: 1,
            semester: 1,
        };

        // Save the course to the database
        const course = new Course(courseData);
        await course.save();

        // Retrieve the course by ID
        const retrievedCourse = await Course.findById(course._id);

        // Check if the course is retrieved successfully
        expect(retrievedCourse._id).toEqual(course._id);

        // Print success message to console
        console.log('Retrieved course by ID successfully:', retrievedCourse);
    });
});
