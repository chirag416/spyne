const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');  // Corrected import

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
