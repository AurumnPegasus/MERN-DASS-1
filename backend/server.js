// Importing required frameworks/libraries
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Importing different files
import userRouts from "./routes/api/users.js";

// Constants
dotenv.config();
const app = express();
const keys = process.env;

// Routes
app.use("/users", userRouts);

// Body Parser
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors());

// Database
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// PORT
app.listen(keys.PORT, () =>
  console.log(`Server up and running on port ${keys.PORT}`)
);
