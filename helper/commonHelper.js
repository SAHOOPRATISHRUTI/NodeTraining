const bcrypt = require("bcrypt");
const saltRounds = 10;

/*FUNC TO GENERATE HASH PASSWORD*/
const generateHashPassword = async (normalPassword) => {
  return bcrypt.hash(normalPassword, saltRounds);
};

/*FUNC TO VERIFY PASSWORD*/
const verifyPassword = async (plainPassword, hashPass) => {
  return bcrypt.compare(plainPassword, hashPass);
};

module.exports = {
  generateHashPassword,
  verifyPassword,
};
