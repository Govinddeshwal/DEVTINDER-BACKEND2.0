const express = require("express");

const app = express();

port = 5002;

app.use(
  "/user",
  (req, res, next) => {
    // res.send("welcome 1 to devtinder.");
    next();
  },
  (req, res, next) => {
    // res.send("welcome 2 to devtinder.");
    next();
  },
  (req, res) => {
    res.send("welcome 3 to devtinder.");
  },
  (req, res) => {
    res.send("welcome to devtinder.");
  },
);
app.use("/hello", (req, res) => {
  res.send("hello to devtinder.");
});

app.listen(port, (req, res) => {
  console.log(`app is listening at localhost:${port}`);
});
