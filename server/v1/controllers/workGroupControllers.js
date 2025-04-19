const mysql2 = require("mysql2");
require("dotenv").config();
const { db } = require("../config/connect_db");
const {
  qGetAllworkGroupsOfUser,
  qGetAworkGroupOfUser,
  qCreateworkGroup,
  qUpdateworkGroup,
  qDeleteworkGroup,
} = require("../sql/teamQueries");

// @route   POST /api/usergroups/:uid
// @desc    Create a group of a user
const createWorkGroup = async (req, res) => {
  const workGroupLeadID = req.params.uid;
  const { workGroupName, workGroupMotive } = req.body;

  db.query(
    qCreateworkGroup,
    [workGroupName, workGroupMotive, workGroupLeadID],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: "Cannot create work group." });
      } else {
        const wid = result.workGroupID;
        res.status(201).json({
          message: "Workgroup created",
          wid,
        });
      }
    }
  );
};

// @route   PUT /api/usergroups/:uid/:wid
// @desc    Update a group of a user
const updateWorkGroup = async (req, res) => {
  const uid = req.params.uid;
  const wid = req.params.wid;
  if (!req.body) {
    res.status(400).json({ error: "req body not present" });
  }
  const { workGroupName, workGroupMotive } = req.body;

  db.query(
    qUpdateworkGroup,
    [workGroupName, workGroupMotive, wid, uid],
    (err, result) => {
      if (err) {
        res.status(400).json({ message: "Cannot update the work group" });
      } else {
        res.status(200).json({ wid });
      }
    }
  );
};

// @route   DELETE /api/usergroups/:uid
// @desc    Delete a group of a user
const deleteWorkGroup = async (req, res) => {
  const uid = req.params.uid;
  const wid = req.params.wid;

  db.query(qDeleteworkGroup, wid, uid, (err, result) => {
    if (err) {
      res.status(400).json({ error: "Cannot delete WG" });
    } else {
      res.status(200).json({ message: "WG deleted" });
    }
  });
};
