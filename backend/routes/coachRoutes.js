const express = require("express");
const {
  getAllCoaches,
  createCoach,
  getCoachById,
  updateCoach,
  deleteCoach,
} = require("../controllers/coachController");

const router = express.Router();

router.get("/", getAllCoaches);
router.post("/", createCoach);
router.get("/:id", getCoachById);
router.put("/:id", updateCoach);
router.delete("/:id", deleteCoach);

module.exports = router;
