// Importing required frameworks/libraries
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import bodyParser from "body-parser";

// Importing different files
import userRoutes from "./routes/api/users.js";
import jobRoutes from './routes/api/jobs.js'
import passFile from "./config/passport.js";

// Constants
dotenv.config();
const app = express();
const keys = process.env;

// Body Parser
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '50mb',
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use("/users", userRoutes);
app.use('/jobs', jobRoutes)
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Database
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected one"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
passFile(passport);

// PORT
app.listen(keys.PORT, () =>
  console.log(`Server up and running on port ${keys.PORT}`)
);
