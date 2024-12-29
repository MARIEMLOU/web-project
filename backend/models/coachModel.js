const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String },
  relatedActivity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  path: { type: String },
});

module.exports = mongoose.model("Coach", coachSchema);
