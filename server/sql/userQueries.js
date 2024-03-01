// user only queries:

// @desc    get a single user
const qGetUser = `
    SELECT userID, userName, userEmail
    FROM accountUser
    WHERE userID = ?
`;

// @desc    create a user
const qCreateUser = `
    insert into accountUser (userName, userEmail, userPassword)
    values (?, ?, ?)
`;

// @desc    update user credentials
const qUpdateUser = `
    update accountUser
    set userName = ?,
        userEmail = ?,
        userPassword = ?
    where userID = ?
`;

// @desc    update user credentials without password
const qUpdateUserWithoutPassword = `
    update accountUser
    set userName = ?,
        userEmail = ?
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

// @desc    confirm user password
const qGetUserPassword = `
    SELECT userPassword
    FROM accountUser u
    WHERE userID = ?
`;

module.exports = {
  qGetUser,
  qCreateUser,
  qUpdateUser,
  qUpdateUserWithoutPassword,
  qDeleteUser,
  qUserExistenceCheck, // used in Sign In
  qGetUserPassword,
};
