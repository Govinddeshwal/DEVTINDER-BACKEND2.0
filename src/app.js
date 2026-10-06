const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const { auth } = require("./middleware/auth");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const { hashPassword } = require("./utils/validation");

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

// signup a user ----
app.post("/signup", async (req, res) => {
  try {
    // validation of data ---
    validateSignupData(req);

    // encrypt the password ---
    const hash = await hashPassword(req);

    // creating a new instance of the User model
    const { firstName, lastName, emailId, age, gender } = req.body;
    const user = new User({
      firstName,
      lastName,
      emailId,
      age,
      gender,
      password: hash,
    });

    await user.save();
    res.send("user added successfully!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// login a user ----

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    console.log(user);
    if (!user) {
      throw new Error("invalid credentials!");
    }
    const isPassword = await bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      throw new Error("invalid credentials!");
    }
    res.send("user login successfully.");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const skills = req.body.skills;

  try {
    const ALLOWED_UPDATES = ["firstName", "photoUrl", "about", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (skills.length > 10) {
      throw new Error("skills can't be more than 10!");
    }

    (await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    }),
      res.send("user updated successflyy."));
  } catch (err) {
    res.status(400).send("Update Failed!" + err.message);
  }
});
