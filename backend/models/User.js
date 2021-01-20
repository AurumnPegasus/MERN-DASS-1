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
  isApplicant: {
    type: Boolean,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  education: [{
    name: String,
    join: String,
    leave: String
  }],
  skills: [{
    name: String
  }]
});

const User = mongoose.model("users", USER);
export default User;