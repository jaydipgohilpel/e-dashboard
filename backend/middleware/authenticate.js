// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const { secret } = require('../secret/secretKey'); // Your secret key

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Check if Authorization header exists and get the token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = decoded; // Set the decoded user information in the request object
        next(); // Proceed to the next middleware
    });
};

module.exports = authenticateToken;
