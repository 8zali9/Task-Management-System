// user only queries:

// @desc    get a single user
const qGetUser = `
    SELECT userID, userName, userEmail
    FROM accountUser
    WHERE userID = ?
`;

// @desc    create a user
const qCreateUser = `
    insert into accountUser (userID, userName, userEmail, userPassword)
    values (?, ?, ?, ?)
`;

// @desc    update user credentials
const qUpdateUser = `
    update accountUser
    set userName = ?,
        userEmail = ?,
        userPassword = ?
    where userID = ?
`;

// @desc    delete user
const qDeleteUser = `
    delete from accountUser
    where userID = ?
`;

// @desc    check existence of a user
const qUserExistenceCheck = `
    SELECT userID, userName, userPassword
    FROM accountUser u
    WHERE userEmail = ?
`;

module.exports = {
  qGetUser,
  qCreateUser,
  qUpdateUser,
  qDeleteUser,
  qUserExistenceCheck, // used in Sign In
};
