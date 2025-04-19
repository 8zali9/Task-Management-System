const express = require("express");
const router = express.Router();
const {
  signInUser,
  signOutUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

// @route   POST /api/user/signin
// @desc    Authenticate and Sign In a user
router.post("/signin", signInUser);

// @route   POST /api/user/signout
// @desc    Sign out a user
router.post("/signout", signOutUser);

// @route   GET /api/user/:id
// @desc    get a user
router.get("/:id", protect, getUser);

// @route   POST /api/user
// @desc    create user
router.post("/", createUser);

// @route   PUT /api/user/:id
// @desc    update user
router.put("/:id", protect, updateUser);

// @route   DELETE /api/user/:id
// @desc    delete user
router.delete("/:id", protect, deleteUser);

module.exports = router;
