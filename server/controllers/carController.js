const Car = require('../models/Car');

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car listing
 *     description: Allows a logged-in user to create a new car listing with images
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Car successfully created
 *       400:
 *         description: Invalid input
 */

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


/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars for the user
 *     description: Retrieves a list of cars added by the user
 *     responses:
 *       200:
 *         description: List of cars
 *       500:
 *         description: Server error
 */
// Get all cars for the logged-in user
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get car details by ID
 *     description: Retrieve details of a specific car listing by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car details
 *       404:
 *         description: Car not found
 */
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

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car listing
 *     description: Updates the details of a car listing. Can also add new images.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Car successfully updated
 *       404:
 *         description: Car not found
 *       400:
 *         description: Invalid input
 */
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


/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car listing
 *     description: Deletes a car listing by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car successfully deleted
 *       404:
 *         description: Car not found
 */
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