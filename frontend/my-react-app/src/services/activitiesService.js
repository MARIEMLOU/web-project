// src/models/services/activityService.js

import apiClient from "./apiClient";

// Service to fetch all activities
export const fetchActivities = async () => {
  try {
    const response = await apiClient.get("/activities");
    return response.data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

// Service to fetch a single activity by ID
export const fetchActivityById = async (id) => {
  try {
    const response = await apiClient.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching activity with ID ${id}:`, error);
    throw error;
  }
};

// Service to add a new activity
export const addActivity = async (activityData) => {
  try {
    const response = await apiClient.post("/activities", activityData);
    return response.data;
  } catch (error) {
    console.error("Error adding a new activity:", error);
    throw error;
  }
};

// Service to update an existing activity
export const updateActivity = async (id, activityData) => {
  try {
    const response = await apiClient.put(`/activities/${id}`, activityData);
    return response.data;
  } catch (error) {
    console.error(`Error updating activity with ID ${id}:`, error);
    throw error;
  }
};

// Service to delete an activity by ID
export const deleteActivity = async (id) => {
  try {
    const response = await apiClient.delete(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting activity with ID ${id}:`, error);
    throw error;
  }
};

const ActivitiesService = {
  fetchActivities,
  fetchActivityById,
  addActivity,
  updateActivity,
  deleteActivity,
};

export default ActivitiesService;
