const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  subscribedPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" }, // Reference to a Plan
  joinDate: { type: Date, default: Date.now },
  path: { type: String },
});

module.exports = mongoose.model("User", userSchema);
