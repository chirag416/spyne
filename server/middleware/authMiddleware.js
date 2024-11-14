const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message); // Debugging line
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = protect;