const Plan = require("../models/planModel");

// Get all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans", error });
  }
};

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);

    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ message: "Error creating plan", error });
  }
};
