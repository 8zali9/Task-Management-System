const jwt = require("jsonwebtoken");
const db = require("../config/promise_connect_db");
const { qGetUser } = require("../sql/userQueries");
const asyncHandler = require("express-async-handler");

const findUser = async (userID) => {
  try {
    const result = await db.query(qGetUser, [userID]);
    return result;
  } catch (error) {
    return null;
  }
};

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await findUser(decoded.userID);
      next();
    } catch (error) {
      res.status(401).json({ error: "Unauthorized. Invalid Token." });
    }
  } else {
    res.status(401).json({ error: "Unauthorized. No Token." });
  }
});

module.exports = { protect };
