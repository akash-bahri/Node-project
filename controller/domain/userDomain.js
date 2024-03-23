const userService = require('../services/userService.js');
const bcrypt = require('bcryptjs');


const login = async (email, password) => {
  let userData = await userService.getAllUsers();
  let validUser = userData.find((user) => user.email === email);
  console.log(validUser);
  if (!validUser) {
    return false;
  }
  const isMatch = await bcrypt.compare(password, validUser.password);
  if (!isMatch) {
    return false;
  }

  return validUser;
}

module.exports = {
    login
    };