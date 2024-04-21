const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    // Get token from headers
    const token = req.headers.authorization;

    // Dynamically import crypto-random-string
    import('crypto-random-string').then(({ default: cryptoRandomString }) => {
        const secretKey = cryptoRandomString({ length: 32, type: 'url-safe' });
        console.log('Generated secret key:', secretKey);

        // Verify token
        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            } else {
                // Add user ID to request object
                req.user = decodedToken.userId;
                next();
            }
        });
    }).catch(error => {
        console.error('Error importing crypto-random-string:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
};

module.exports = authenticateUser;
