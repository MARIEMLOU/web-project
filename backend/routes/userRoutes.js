const express = require("express");
const {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadProfilePicture,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUserById);
router.post("/", createUser);
router.put("/update", updateUser);
router.delete("/:id", deleteUser);
router.patch("/upload-image", uploadProfilePicture);

module.exports = router;
