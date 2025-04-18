/* !!! 
  user id -> uid
  task id -> tid
*/

const mysql2 = require("mysql2");
require("dotenv").config();
const db = require("../config/connect_db");
const {
  qGetAllTasks,
  qGetTask,
  qAddTask,
  qUpdateTask,
  qDeleteTask,
} = require("../sql/userTaskQueries");

// @route   GET /api/usertasks/:uid
// @desc    Get all tasks of a user
const getAllTasks = async (req, res) => {
  const userID = req.params.uid;

  db.query(qGetAllTasks, [userID], (err, result) => {
    if (err) {
      throw new Error();
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "Tasks doesnot exist." });
      } else {
        res.status(200).json(result);
      }
    }
  });
};

// @route   GET /api/usertasks/:uid/:tid
// @desc    Get a single task of a user
const getTask = async (req, res) => {
  const userID = req.params.uid;
  const taskID = req.params.tid;

  db.query(qGetTask, [userID, taskID], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error getting the task." });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "Task doesnot exists." });
      } else {
        res.status(200).json(result);
      }
    }
  });
};

// @route   POST /api/usertasks/:uid
// @desc    Create a task
const addTask = async (req, res) => {
  const userID = req.params.uid;
  const { taskName, taskDetails, priority, deadline } = req.body;

  db.query(
    qAddTask,
    [taskName, taskDetails, priority, deadline, userID],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: "Cannot add the task." });
      } else {
        const tID = result.taskID;
        res.status(201).json({
          message: "Task added.",
          tID,
        });
      }
    }
  );
};

// @route   PUT /api/usertasks/:uid/:tid
// @desc    Update a task
const updateTask = async (req, res) => {
  const userID = req.params.uid;
  const taskID = req.params.tid;
  const { taskName, taskDetails } = req.body;

  db.query(
    qUpdateTask,
    [taskID, taskName, taskDetails, userID],
    (err, result) => {
      if (err) {
        res.status(404).json({ error: "Unable to update task." });
      } else {
        res.status(200).json({
          message: "Task Updated.",
          taskName,
          taskDetails,
        });
      }
    }
  );
};

// @route   DELETE /api/usertasks/:uid/:tid
// @desc    Delete a task
const deleteTask = async (req, res) => {
  const userID = req.params.uid;
  const taskID = req.params.tid;

  db.query(qDeleteTask, [taskID, userID], (err, result) => {
    if (err) {
      res.status(404).json({ error: "Unable to update task." });
    } else {
      res.status(200).json({ message: "Task Deleted." });
    }
  });
};

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
