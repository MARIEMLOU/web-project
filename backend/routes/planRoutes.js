const express = require("express");
const { getAllPlans, createPlan } = require("../controllers/planController");
const router = express.Router();

router.get("/", getAllPlans);
router.post("/", createPlan);

module.exports = router;
