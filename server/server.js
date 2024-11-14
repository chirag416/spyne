const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); 

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from uploads directory


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Multer configuration for image uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads'); // Save files in the uploads directory
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Unique filename
//     }
// });

// const upload = multer({ storage: storage });

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

// API Documentation route
app.use("/api/docs", express.static('docs')); // Serve the documentation

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});