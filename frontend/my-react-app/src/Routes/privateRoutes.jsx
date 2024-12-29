// src/routes/privateRoutes.js
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

// Utility function to check authentication
const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  return !!token; // Returns true if a token exists
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate children as a React node and required
};

export default ProtectedRoute;
