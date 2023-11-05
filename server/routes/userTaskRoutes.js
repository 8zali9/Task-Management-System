const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/userTaskControllers");

// @route   GET /api/usertasks/:id/allTasks
// @desc    Get all tasks of a user
router.get("/:id/allTasks", getAllTasks);

// @route   GET /api/usertasks/:id/getTask/:id
// @desc    Get a single task of a user
router.get("/:id/getTask/:id", getTask);

// @route   POST /api/usertasks/:id
// @desc    Create a task
router.post("/:id", addTask);

// @route   PUT /api/usertasks/:id/getTask/:id
// @desc    Update a task
router.put("/:id", updateTask);

// @route   DELETE /api/usertasks/:id/getTask/:id
// @desc    Delete a task
router.delete("/:id", deleteTask);

module.exports = router;
