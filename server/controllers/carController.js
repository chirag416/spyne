const Car = require('../models/Car');

// Create a new car
exports.createCar = async (req, res) => {
    try {
        console.log("Uploaded files:", req.files); // Log uploaded files
        const { title, description, tags } = req.body;
        
        if (!req.files || req.files.length === 0) {
            console.log("No files were uploaded.");
        }

        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : []; // Store image paths

        console.log("Image paths:", images); // Log image paths being saved

        const car = new Car({
            user: req.user.id,
            title,
            description,
            tags,
            images,
        });

        const savedCar = await car.save();
        res.status(201).json(savedCar);
    } catch (error) {
        console.error("Error creating car:", error); // Log error details
        res.status(500).json({ message: error.message });
    }
};

// Get all cars for the logged-in user
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single car by ID
exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car || car.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a car
exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car || car.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Car not found' });
        }

        car.title = req.body.title || car.title;
        car.description = req.body.description || car.description;
        car.tags = req.body.tags || car.tags;
        
        if (req.files) {
            car.images.push(...req.files.map(file => `/uploads/${file.filename}`)); // Append new images
        }

        const updatedCar = await car.save();
        res.json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a car
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car || car.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Car not found' });
        }

        await car.deleteOne();
        res.json({ message: 'Car removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};