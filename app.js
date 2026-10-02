const express = require("express");
const connectDB = require("./config/database");
const { auth } = require("./auth");
const User = require("./models/user");

const app = express();
app.use(express.json());
port = 5002;

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(port, (req, res) => {
      console.log(`app is listening at localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected! ");
  });

app.post("/signup", async (req, res) => {
  const userObj = req.body;
  const user = new User(userObj);
  await user.save();
  res.send("user added successfully!");
});

app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  console.log(email);
  try {
    const user = await User.findOne({ emailId: email });
    if (!user) {
      res.send("user not found!");
    }

    if (user.length === 0) {
      res.status(404).send("user not found!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send(400).send("Something went Wrong!");
  }
});
