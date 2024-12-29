const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true }, // e.g., "1 month", "3 months"
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Plan", planSchema);
