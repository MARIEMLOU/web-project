const mongoose = require("mongoose");

const planningSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g., "Monday", "Tuesday"
  time: { type: String, required: true }, // e.g., "10:00 AM - 12:00 PM"
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" }, // Reference to an Activity
  coach: { type: mongoose.Schema.Types.ObjectId, ref: "Coach" }, // Reference to a Coach
});

module.exports = mongoose.model("Planning", planningSchema);
