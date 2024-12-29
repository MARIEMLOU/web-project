// src/controllers/activitiesController.js
import ActivitiesService from "../services/activitiesService";

// Function to fetch activities data
export const getActivities = async () => {
  try {
    // Fetch activities from the service
    const activities = await ActivitiesService.fetchActivities();

    // Update image URLs to be relative to the frontend images directory
    const updatedActivities = activities.map((activity) => {
      const updatedActivity = { ...activity };

      // Update imageUrl to be a relative path to /images directory
      updatedActivity.imageUrl = `/images/${activity.image.split("/").pop()}`;

      // Update each coach's image URL as well (if coaches are present)
      if (updatedActivity.coaches) {
        updatedActivity.coaches = updatedActivity.coaches.map((coach) => {
          return {
            ...coach,
            imageUrl: `/images/${coach.image.split("/").pop()}`,
          };
        });
      }

      return updatedActivity;
    });

    return updatedActivities;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};
