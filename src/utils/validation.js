const bcrypt = require("bcrypt");
const validator = require("validator");

const validateSignupData = (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("name is required!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter a strong password!");
  }
};

const hashPassword = async (req) => {
  const password = req.body.password;

  const hash = await bcrypt.hash(password, 10);

  return hash;
};

module.exports = {
  hashPassword,
  validateSignupData,
};
