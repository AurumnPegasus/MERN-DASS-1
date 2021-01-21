// Importing required framework/libraries
import express from "express";

// Importing files
import { registerUser, loginUser, profileUser, editprofileUser, reditprofileUser } from "../controllers/users.js";

// Constants
const router = express.Router();

// Declaring routes

// @route POST users/register
router.post("/register", registerUser);

// @route POST users/login
router.post("/login", loginUser);

// @route POST users/profile
router.post('/profile', profileUser)

// @route POST users/editprofile
router.post('/editprofile', editprofileUser)

// @route POST users/reditprofile
router.post('/reditprofile', reditprofileUser)

export default router;
