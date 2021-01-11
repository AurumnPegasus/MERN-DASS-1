// Importing required framework/libraries
import express from "express";

// Importing files
import { registerUser } from "../controllers/users.js";

// Constants
const router = express.Router();

// Declaring routes

// @route POST users/register
router.get("/register", registerUser);

export default router;
