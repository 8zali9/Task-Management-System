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

const getAllTasks = async (req, res) => {};

const getTask = async (req, res) => {};

const addTask = async (req, res) => {};

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
