const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Controller function to handle user registration
exports.register = async (req, res) => {
    try {
        // Extract user data from request body
        const { username, email, password } = req.body;

        // Check if user with provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to handle user login
exports.login = async (req, res) => {
    try {
        // Extract credentials from request body
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
