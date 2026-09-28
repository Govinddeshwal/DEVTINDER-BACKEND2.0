const password = "xyz";
const hashPassword = "xyz";
const correct = password === hashPassword;

const auth = (req, res, next) => {
  if (!correct) {
    res.status(401).send("unauthorized user");
  } else {
    next();
  }
};

module.exports = { auth };
