// Importing required framework/libraries
import express from "express";

import { viewJob, createJob, getJob, editJob, rJob, deleteJob } from '../controllers/jobs.js'

// Constants
const router = express.Router();

// Declaring routes

// @route GET jobs/register
router.get("/viewjob", viewJob);

// @route POST jobs/createjob
router.post('/createjob', createJob)

// @route POST jobs/getjob
router.post('/getjob', getJob)
 
// @route POST jobs/editjob
router.post('/editjob', editJob)

// @route POST jobs/rjob
router.post('/rjob', rJob);

// @route POST jobs/deletejob
router.post('/deletejob', deleteJob)

export default router;
