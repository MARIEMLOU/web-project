const express = require("express");
const {
  getAllPlannings,
  createPlanning,
  getPlanningById,
  updatePlanning,
  deletePlanning,
} = require("../controllers/planningController");

const router = express.Router();

router.get("/", getAllPlannings);
router.post("/", createPlanning);
router.get("/:id", getPlanningById);
router.put("/:id", updatePlanning);
router.delete("/:id", deletePlanning);

module.exports = router;
