// Importing required framework/libraries
import mongoose from "mongoose";

// Constants
const SCHEMA = mongoose.Schema;

// Declaring schema of user
const APPLICATION = new SCHEMA({
  title: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  myEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  sop: {
    type: String,
    required: true
  }, 
  apply: {
    type: String,
    required: true
  },
  join: {
    type: String,
    required: false
  }
});

const Application = mongoose.model("applications", APPLICATION);
export default Application;