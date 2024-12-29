const User = require("../models/userModel");
const path = require("path"); // Import path module
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { error } = require("console");
const multer = require("multer");

// Helper function to get the user ID from the JWT token
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

exports.getUserById = async (req, res) => {
  try {
    // Get the token from the Authorization header (e.g., "Bearer <token>")
    const token = req.header("Authorization").replace("Bearer ", "");
    const userId = getUserIdFromToken(token); // Extract the user ID from the token

    // Find the user by the ID obtained from the token
    const user = await User.findById(userId)
      .populate("subscribedPlan")
      .select("-password"); // Exclude the password field

    if (!user) {
      console.log(error);
      return res.status(404).json({ message: "User not found" });
    }

    // Add the image URL for the user
    const usersWithImage = {
      ...user.toObject(),
      image: `${req.protocol}://${req.get("host")}/images/${path.basename(
        user.path
      )}`, // Generate image URL
    };
    console.log("user  ***********", usersWithImage);

    res.status(200).json(usersWithImage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  try {
    const { name, email, path, phone } = req.body;
    const token = req.header("Authorization").replace("Bearer ", "");
    const userId = getUserIdFromToken(token);

    const user = await User.findById(userId).populate("subscribedPlan");
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.image = path; // Assuming `path` refers to the new image URL
    await user.save();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Upload profile picture controller
exports.uploadProfilePicture = async (req, res) => {
  try {
    // Configure multer for file uploads
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../images");
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
      },
    });

    const upload = multer({
      storage,
      fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(
          path.extname(file.originalname).toLowerCase()
        );
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype) {
          cb(null, true);
        } else {
          cb(new Error("Only images are allowed"));
        }
      },
    }).single("image");

    // Handle the file upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const token = req.header("Authorization").replace("Bearer ", "");
      const userId = getUserIdFromToken(token);
      const imageUrl = `backend/images/${req.file.filename}`.replace(
        /\//g,
        "\\"
      );
      // Find the user by the ID obtained from the token
      const user = await User.findById(userId).populate("subscribedPlan");
      user.path = imageUrl;
      user.save();

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        imageUrl: imageUrl,
      });
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
};
