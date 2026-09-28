const express = require("express");
const connectDB = require("./config/database");
const { auth } = require("./auth");

const app = express();

connectDB();

port = 5002;

app.use("/", (req, res) => {
  res.send("this is / route");
  console.log("this is / route");
});

app.use("/user", (req, res) => {
  console.log("this is /user route");
  res.send("this is /user route");
});

app.listen(port, (req, res) => {
  console.log(`app is listening at localhost:${port}`);
});
