const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginUser, authenticateToken } = require('../middleware/authenticationMiddleware');

// Route for user login
router.post('/login', loginUser);

// Route for user registration
router.post('/register', authController.register);

// Route for accessing a protected resource
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Protected resource accessed successfully' });
});

module.exports = router;
