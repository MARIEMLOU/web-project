// src/controllers/activitiesController.js
import userService from "../services/userService";

// Function to fetch activities data
export const getUser = async () => {
  try {
    // Fetch activities from the service
    const user = await userService.fetchUser();

    // Update image URLs to be relative to the frontend images directory
    const updateduser = {
      ...user,

      imageUrl: `/images/${user.image.split("/").pop()}`,
    };
    return updateduser;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

// Function to upload profile picture
export const uploadProfilePicture = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await userService.uploadImage(formData);
    return response;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

// Function to save updated user profile
export const saveUserProfile = async (userInfo) => {
  try {
    console.log("data from controller", userInfo);
    // Assuming the `userService.updateUser` is a function in your service that handles updating user data
    const response = await userService.updateUser(userInfo);

    // Handle the response from the service (e.g., check for success status)
    if (response.success) {
      return { success: true, message: "Profile updated successfully" };
    } else {
      return { success: false, message: "Failed to update profile" };
    }
  } catch (error) {
    console.error("Error saving user profile:", error);
    return { success: false, message: "Error occurred while saving profile" };
  }
};
