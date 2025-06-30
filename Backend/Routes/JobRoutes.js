import express from 'express'
import { allJobs, createJob, deleteJob, getJobByID, updateJob } from '../Controllers/JobController.js';
import protect from './protect.js';

const router = express.Router();

// Get all jobs
// Method GET
router.get("/", protect, allJobs)

// Get by ID jobs
// Method GET
router.get("/:id", protect, getJobByID)

// create New Job
// Method POST
router.post("/", protect, createJob)

// Update Job
// Method PUT
router.put("/:id", protect, updateJob)

// Delete Job
// Method DELETE
router.delete("/:id", protect, deleteJob)


export default router;


