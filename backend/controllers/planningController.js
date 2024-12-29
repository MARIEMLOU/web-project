const Planning = require("../models/planningModel");

// Get all planning sessions
exports.getAllPlannings = async (req, res) => {
  try {
    const plannings = await Planning.find()
      .populate("activity")
      .populate("coach");
    res.status(200).json(plannings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching planning", error });
  }
};

// Create a new planning session
exports.createPlanning = async (req, res) => {
  try {
    const planning = await Planning.create(req.body);
    res.status(201).json(planning);
  } catch (error) {
    res.status(400).json({ message: "Error creating planning", error });
  }
};

// Get a specific planning session by ID
exports.getPlanningById = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id)
      .populate("activity")
      .populate("coach");
    if (!planning) {
      return res.status(404).json({ message: "Planning not found" });
    }
    res.status(200).json(planning);
  } catch (error) {
    res.status(500).json({ message: "Error fetching planning", error });
  }
};

// Update a planning session
exports.updatePlanning = async (req, res) => {
  try {
    const planning = await Planning.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!planning) {
      return res.status(404).json({ message: "Planning not found" });
    }
    res.status(200).json(planning);
  } catch (error) {
    res.status(400).json({ message: "Error updating planning", error });
  }
};

// Delete a planning session
exports.deletePlanning = async (req, res) => {
  try {
    const planning = await Planning.findByIdAndDelete(req.params.id);
    if (!planning) {
      return res.status(404).json({ message: "Planning not found" });
    }
    res.status(200).json({ message: "Planning deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting planning", error });
  }
};
