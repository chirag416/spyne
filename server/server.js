const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); 

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: '*',
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from uploads directory

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
      openapi: "3.0.0",
      info: {
          title: "Car Management API",
          version: "1.0.0",
          description: "API documentation for the car management application",
      },
      servers: [
          {
              url: "http://localhost:5000", // Backend URL
          },
      ],
  },
  apis: [ "./controllers/*.js"], // Path to your API routes
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

// API Documentation route
app.use("/api/docs", express.static('docs')); // Serve the documentation
app.get("/api/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "docs", "CarManagement.postman_collection.json"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});