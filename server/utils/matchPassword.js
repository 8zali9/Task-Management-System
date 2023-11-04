const bcrypt = require("bcryptjs");

const matchPassword = async (enteredPassword, userPassword) => {
  if (enteredPassword !== null && enteredPassword !== undefined)
    return await bcrypt.compare(enteredPassword, userPassword);
  return false;
};

module.exports = matchPassword;
