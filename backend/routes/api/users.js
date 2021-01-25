// Importing required framework/libraries
import express from "express";

// Importing files
import { registerUser, applicant, loginUser, profileUser, editprofileUser, reditprofileUser, apply, myApps, rmyApps, status } from "../controllers/users.js";

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

// @route POST users/apply
router.post('/apply', apply)

// @route POST users/myapps
router.post('/myapps', myApps)

// @route POST users/rmyapps
router.post('/rmyapps', rmyApps)

// @route POST users/status
router.post('/status', status)

// @route POST users/applicant
router.post('/applicant', applicant)

export default router;
