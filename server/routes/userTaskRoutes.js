/* !!! 
  user id -> uid
  task id -> tid
*/

const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/userTaskControllers");
const { protect } = require("../middlewares/authMiddleware");

// @route   GET /api/usertasks/:uid
// @desc    Get all tasks of a user
router.get("/:uid", protect, getAllTasks);

// @route   GET /api/usertasks/:uid/:tid
// @desc    Get a single task of a user
router.get("/:uid/:tid", protect, getTask);

// @route   POST /api/usertasks/:uid
// @desc    Create a task
router.post("/:uid", protect, addTask);

// @route   PUT /api/usertasks/:uid/:tid
// @desc    Update a task
router.put("/:uid/:tid", protect, updateTask);

// @route   DELETE /api/usertasks/:uid/:tid
// @desc    Delete a task
router.delete("/:uid/:tid", protect, deleteTask);

module.exports = router;
