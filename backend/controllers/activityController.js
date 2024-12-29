const Activity = require("../models/activityModel");
const Coach = require("../models/coachModel");

const path = require("path");
const fs = require("fs");

// Get all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    const response = await Promise.all(
      activities.map(async (activity) => {
        const relatedCoaches = await Coach.find({
          relatedActivity: activity._id,
        });
        return {
          title: activity.name,
          description: activity.description,
          image: `${req.protocol}://${req.get("host")}/images/${path.basename(
            activity.path
          )}`,
          coaches: relatedCoaches.map((coach) => ({
            name: coach.name,
            specialty: coach.specialty,
            image: coach.path
              ? `${req.protocol}://${req.get("host")}/images/${path.basename(
                  coach.path
                )}`
              : null,
          })),
        };
      })
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error });
  }
};

// Get a specific activity by ID
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    const relatedCoaches = await Coach.find({ relatedActivity: activity._id });
    console.log(relatedCoaches[0].path);
    const response = {
      title: activity.name,
      description: activity.description,
      image: `${req.protocol}://${req.get("host")}/images/${path.basename(
        activity.path
      )}`,
      coaches: relatedCoaches.map((coach) => ({
        name: coach.name,
        specialty: coach.specialty,
        image: coach.path
          ? `${req.protocol}://${req.get("host")}/images/${path.basename(
              coach.path
            )}`
          : null,
      })),
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activity", error });
  }
};
// Create a new activity
exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: "Error creating activity", error });
  }
};

// Update an activity
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ message: "Error updating activity", error });
  }
};

// Delete an activity
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting activity", error });
  }
};
