// Importing required framework/libraries
import express from "express";

// Importing files
import { registerUser, loginUser, profileUser } from "../controllers/users.js";

// Constants
const router = express.Router();

// Declaring routes

// @route POST users/register
router.post("/register", registerUser);

// @route POST users/login
router.post("/login", loginUser);

router.post('/profile', profileUser)

export default router;
