const Coach = require("../models/coachModel");
const path = require("path");

// Get all coaches
exports.getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find().populate("relatedActivity");
    const response = coaches.map((coach) => ({
      name: coach.name,
      specialty: coach.specialty,
      relatedActivity: coach.relatedActivity?.name || null,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${path.basename(
        coach.path
      )}`,
    }));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coaches", error });
  }
};

// Get a specific coach by ID
exports.getCoachById = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id).populate(
      "relatedActivity"
    );
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    const response = {
      name: coach.name,
      specialty: coach.specialty,
      relatedActivity: coach.relatedActivity?.name || null,
      imageUrl: coach.path
        ? `${req.protocol}://${req.get("host")}/images/${path.basename(
            coach.path
          )}`
        : null,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coach", error });
  }
};

// Create a new coach
exports.createCoach = async (req, res) => {
  try {
    const coach = await Coach.create(req.body);
    res.status(201).json(coach);
  } catch (error) {
    res.status(400).json({ message: "Error creating coach", error });
  }
};

// Update a coach
exports.updateCoach = async (req, res) => {
  try {
    const coach = await Coach.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.status(200).json(coach);
  } catch (error) {
    res.status(400).json({ message: "Error updating coach", error });
  }
};

// Delete a coach
exports.deleteCoach = async (req, res) => {
  try {
    const coach = await Coach.findByIdAndDelete(req.params.id);
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.status(200).json({ message: "Coach deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coach", error });
  }
};
