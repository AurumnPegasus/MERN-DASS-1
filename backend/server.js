// Importing required frameworks/libraries
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import bodyParser from "body-parser";

// Importing different files
import userRoutes from "./routes/api/users.js";
import passFile from "./config/passport.js";

// Constants
dotenv.config();
const app = express();
const keys = process.env;

// Body Parser
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use("/users", userRoutes);

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
