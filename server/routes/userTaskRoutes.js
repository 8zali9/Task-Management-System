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

// @route   POST /api/usertasks/:id/getTask/:id
// @desc    Get a single task of a user
router.post("/:id/getTask/:id", getTask);

// @route   POST /api/usertasks/
// @desc    Create a task
router.get("/", addTask);

// @route   PUT /api/usertasks/:id
// @desc    Update a task
router.put("/:id", updateTask);

// @route   DELETE /api/usertasks/:id
// @desc    Delete a task
router.delete("/:id", deleteTask);

module.exports = router;
