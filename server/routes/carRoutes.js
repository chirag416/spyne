const express = require('express');
const { createCar, getCars, getCar, updateCar, deleteCar } = require('../controllers/carController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // Import the multer setup

const router = express.Router();

// Create a new car with image upload
router.post('/', protect, upload.array('images', 10), createCar); // Use multer middleware here
router.get('/', protect, getCars);
router.get('/:id', protect, getCar);
router.put('/:id', protect, updateCar);
router.delete('/:id', protect, deleteCar);

module.exports = router;