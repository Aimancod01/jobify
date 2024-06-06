import mongoose from "mongoose";
import User from "./models/userModel.js";
import { readFile } from "fs/promises";
import Job from "./models/jobModel.js";
import dotenv from "dotenv";
dotenv.config();

try {
  await mongoose.connect(process.env.DB);
  const user = await User.findOne({ email: "test@gmail.com" });
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("success");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
