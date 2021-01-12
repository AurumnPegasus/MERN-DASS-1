// Importing required framework/libraries
import mongoose from "mongoose";

// Constants
const SCHEMA = mongoose.Schema;

// Declaring schema of user
const USER = new SCHEMA({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("users", USER);
export default User;
