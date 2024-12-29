// app.js
const express = require("express");
const connectDB = require("./config/db"); // Adjust the path if necessary
const cors = require("cors");

// Import middlewares
const authMiddleware = require("./middlewares/authMiddleware");

// Import routes
const {
  plansRoutes,
  userRoutes,
  activityRoutes,
  coachRoutes,
  planningRoutes,
  authRoutes,
} = {
  plansRoutes: require("./routes/planRoutes"),
  userRoutes: require("./routes/userRoutes"),
  activityRoutes: require("./routes/activityRoutes"),
  coachRoutes: require("./routes/coachRoutes"),
  planningRoutes: require("./routes/planningRoutes"),
  authRoutes: require("./routes/authRoutes"),
};

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
const path = require("path");

// Serve static images
app.use("/images", express.static(path.join(__dirname, "images")));
// Public route for login
app.use("/api/auth", authRoutes);
// Public routes (do not require authentication)
app.use("/api/plans", authMiddleware, plansRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/activities", authMiddleware, activityRoutes);
app.use("/api/coaches", authMiddleware, coachRoutes);
app.use("/api/plannings", authMiddleware, planningRoutes);

module.exports = app;
