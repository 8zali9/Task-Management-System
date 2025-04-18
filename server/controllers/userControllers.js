const mysql2 = require("mysql2");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const db = require("../config/connect_db");
const hashPassword = require("../utils/hashPassword");
const matchPassword = require("../utils/matchPassword");
const generateToken = require("../utils/generateToken");
const {
  qGetUser,
  qCreateUser,
  qUpdateUser,
  qUpdateUserWithoutPassword,
  qDeleteUser,
  qUserExistenceCheck,
  qGetUserPassword,
} = require("../sql/userQueries");

// @route   POST /api/user/signin
// @desc    Authenticate and Login user
const signInUser = asyncHandler(async (req, res) => {
  const { userEmail, userPassword } = req.body;

  db.query(qUserExistenceCheck, [userEmail], async (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again." });
    } else {
      if (result.length === 0) {
        return res.status(401).json({ error: "Incorrect Credentials." });
      }

      const passMatchCheck = await matchPassword(
        userPassword,
        result[0].userPassword
      );

      if (!passMatchCheck) {
        return res.status(401).json({ error: "Incorrect Credentials." });
      }

      const userID = result[0].userID;
      const userName = result[0].userName;
      generateToken(res, userID); // generating token
      res.status(201).json({
        message: "Authenticated User.",
        userID,
        userName,
        userEmail,
      });
    }
  });
});

// @route   POST /api/user/signout
// @desc    Sign out a user
const signOutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Signed out." });
};

// @route   GET /api/user/:id
// @desc    get a user
const getUser = (req, res) => {
  const userID = req.params.id;

  db.query(qGetUser, [userID], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error getting the user." });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "User doesnot exists." });
      } else {
        res.status(200).json(result);
      }
    }
  });
};

// @route   POST /api/user
// @desc    create/register user
const createUser = asyncHandler(async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  const hashedPassword = await hashPassword(userPassword); // hashing password

  db.query(
    qCreateUser,
    [userName, userEmail, hashedPassword],
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .json({ error: "Cannot Register the user. Incorrect Credentials." });
      } else {
        const userID = result.userID;
        generateToken(res); // generating token
        res.status(201).json({
          message: "User Registered Successfully.",
          userID,
          userName,
          userEmail,
        });
      }
    }
  );
});

// @route   PUT /api/user/:id
// @desc    update user
const updateUser = asyncHandler(async (req, res) => {
  const userToUpdate = req.params.id;
  const { userName, userEmail, userPassword } = req.body;

  let password;
  let userInfoArray = [];
  let querydb;

  if (userPassword) {
    password = await hashPassword(userPassword); // hashing password
    userInfoArray.push(userName, userEmail, password, userToUpdate);
    querydb = qUpdateUser;
  } else {
    userInfoArray.push(userName, userEmail, userToUpdate);
    querydb = qUpdateUserWithoutPassword;
  }

  db.query(querydb, userInfoArray, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ error: "Cannot update the user." });
    } else {
      res.status(200).json({
        message: "User Updated Successfully.",
        userName,
        userEmail,
      });
    }
  });
});

// @route   DELETE /api/user/:id
// @desc    delete user
const deleteUser = asyncHandler(async (req, res) => {
  const userToDelete = req.params.id;
  const { userPassword } = req.body;

  try {
    db.query(qGetUserPassword, [userToDelete], async (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Something went wrong. Please try again." });
      } else {
        if (result.length === 0) {
          return res.status(404).json({ error: "User not found." });
        }

        const passMatchCheck = await matchPassword(
          userPassword,
          result[0].userPassword
        );

        if (!passMatchCheck) {
          return res.status(401).json({ error: "Incorrect Credentials." });
        } else {
          db.query(qDeleteUser, [userToDelete], (err, result) => {
            if (err) {
              res.status(404).json({ error: "Cannot delete the user." });
            } else {
              res.status(200).json({ message: "User Deleted Successfully." });
            }
          });
        }
      }
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

module.exports = {
  signInUser,
  signOutUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
