// src/models/services/coachService.js

import apiClient from "./apiClient";

// Service to fetch all coaches
export const fetchCoaches = async () => {
  try {
    const response = await apiClient.get("/coaches");
    return response.data;
  } catch (error) {
    console.error("Error fetching coaches:", error);
    throw error;
  }
};

// Service to fetch a single coach by ID
export const fetchCoachById = async (id) => {
  try {
    const response = await apiClient.get(`/coaches/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching coach with ID ${id}:`, error);
    throw error;
  }
};

// Service to add a new coach
export const addCoach = async (coachData) => {
  try {
    const response = await apiClient.post("/coaches", coachData);
    return response.data;
  } catch (error) {
    console.error("Error adding a new coach:", error);
    throw error;
  }
};

// Service to update an existing coach
export const updateCoach = async (id, coachData) => {
  try {
    const response = await apiClient.put(`/coaches/${id}`, coachData);
    return response.data;
  } catch (error) {
    console.error(`Error updating coach with ID ${id}:`, error);
    throw error;
  }
};

// Service to delete a coach by ID
export const deleteCoach = async (id) => {
  try {
    const response = await apiClient.delete(`/coaches/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting coach with ID ${id}:`, error);
    throw error;
  }
};
