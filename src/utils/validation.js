const bcrypt = require("bcrypt");
const validator = require("validator");

const validateSignupData = (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastname) {
    throw new Error("name is required!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter a strong password!");
  }
};

const hashPassword = (req, res) => {
  const saltRounds = 10;

  const myPlaintextPassword = req.body.password;

  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {});
};

module.exports = { hashPassword, validateSignupData };
