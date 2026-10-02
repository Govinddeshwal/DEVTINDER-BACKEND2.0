const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.error("Database connection is failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
