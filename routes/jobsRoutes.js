import express from "express";
const router = express.Router();
import {
  getAllJobs,
  createJob,
  getJobById,
  editJob,
  deleteJob,
  stats,
} from "../controllers/jobsControllers.js";
import { validateTest } from "../middlewares/validator.js";
import { checkTestUser } from "../middlewares/authMiddleware.js";
router.route("/").get(getAllJobs).post(checkTestUser, createJob);
router.route("/stats").get(stats);
router
  .route("/:id")
  .get(checkTestUser, getJobById)
  .delete(checkTestUser, deleteJob)
  .patch(checkTestUser, validateTest, editJob);

export default router;
