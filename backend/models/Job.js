// Importing required framework/libraries
import mongoose from "mongoose";

// Constants
const SCHEMA = mongoose.Schema;

// Declaring schema of user
const JOB = new SCHEMA({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  applicants: {
    type: Number,
    required: true
  },
  positions: {
    type: Number,
    required: true
  },
  skills: [{
    name: String
  }],
  jobtype: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  salary: {
      type: Number,
      required: true
  },
  post: {
    type: String,
    required: true
  }, 
  deadline: {
    type: String,
    required: true
  }
});

const Job = mongoose.model("jobs", JOB);
export default Job;