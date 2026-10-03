const mongoose = require("mongoose");
// Helper function to test regex
const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLenght: 3,
    },
    lastName: {
      type: String,
      trim: true,
      minLenght: 3,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("this gender data is not valid!");
        }
      },
    },
    age: {
      type: Number,
      trim: true,
    },
    photoUrl: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      default: "this is a default about of the user!",
      trim: true,
    },
    skills: {
      type: [String],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", userSchema);

module.exports = User;
