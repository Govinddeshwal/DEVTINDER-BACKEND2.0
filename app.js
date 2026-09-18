const express = require("express");

const app = express();

port = 5002;

app.use("/", (req, res) => {
  res.send("welcome to devtinder.");
});

app.listen(port, (req, res) => {
  console.log(`app is listening at localhost:${port}`);
});
