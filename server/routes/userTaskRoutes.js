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

// @route   GET /api/usertasks/:uid
// @desc    Get all tasks of a user
router.get("/:uid", getAllTasks);

// @route   GET /api/usertasks/:uid/:tid
// @desc    Get a single task of a user
router.get("/:uid/:tid", getTask);

// @route   POST /api/usertasks/:uid
// @desc    Create a task
router.post("/:uid", addTask);

// @route   PUT /api/usertasks/:uid/:tid
// @desc    Update a task
router.put("/:uid/:tid", updateTask);

// @route   DELETE /api/usertasks/:uid/:tid
// @desc    Delete a task
router.delete("/:uid/:tid", deleteTask);

module.exports = router;
