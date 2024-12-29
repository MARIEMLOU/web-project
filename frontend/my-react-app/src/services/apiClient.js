// src/models/services/apiClient.js

import axios from "axios";

// Create an instance of axios
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for the backend API
});

// Add a request interceptor to include the token in each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response, // Simply return the response if successful
  (error) => {
    // Check if the error is 401 and not already on the login page
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;

      // Avoid redirection if already on the login page
      if (currentPath !== "/login") {
        // Clear token and redirect to login on 401 Unauthorized
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else {
      // Log the error to the console
      console.error("API error:", error);
    }
    return Promise.reject(error); // Continue to reject the error
  }
);

export default apiClient;
