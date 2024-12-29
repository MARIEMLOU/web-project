// src/models/services/activityService.js

import apiClient from "./apiClient";

// Service to fetch all activities
export const fetchUser = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

// Service to fetch a single activity by ID
export const fetchUseryById = async (id) => {
  try {
    const response = await apiClient.get(`/users/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching activity with ID ${id}:`, error);
    throw error;
  }
};

// Upload profile picture
const uploadImage = async (formData) => {
  const response = await apiClient.patch("/users/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("response from service");
  return response.data;
};

// Update user profile
const updateUser = async (userInfo) => {
  try {
    const response = await apiClient.put("/users/update", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // The updated user data or a success message
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

const UserService = {
  uploadImage,
  fetchUser,
  fetchUseryById,
  updateUser,
};

export default UserService;
