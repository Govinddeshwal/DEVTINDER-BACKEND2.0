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
// add a user ----
app.post("/signup", async (req, res) => {
  const userObj = req.body;
  const user = new User(userObj);
  await user.save();
  res.send("user added successfully!");
});

// get a user ----
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

// get all user ----
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send(400).send("Something went Wrong!");
  }
});

// delete a user ----
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status.send("Somethig went Wrong!");
  }
});

// update a user ----
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    (await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    }),
      res.send("user updated successflyy."));
  } catch (err) {
    res.status(400).send("Update Failed!" + err.message);
  }
});
