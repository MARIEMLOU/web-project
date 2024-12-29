const jwt = require("jsonwebtoken");
require("dotenv").config();

// Use the secret key from the environment variables
const secretKey = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header (e.g., "Bearer <token>")
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Remove "Bearer " from the token if it exists
    const tokenValue = token.startsWith("Bearer ") ? token.slice(7) : token;

    // Verify the token
    const decoded = jwt.verify(tokenValue, secretKey);
    req.user = decoded; // Attach user information to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
