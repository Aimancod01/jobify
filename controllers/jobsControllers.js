import { nanoid } from "nanoid";
import Job from "../models/jobModel.js";
import { NotFoundError, UnauthorizedError } from "../errors/customErros.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

export const getAllJobs = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({ createdBy: req.user.id });
  res.status(200).json({
    results: jobs.length,
    jobs,
  });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.json({ job });
};

export const getJobById = async (req, res) => {
  const id = req.params.id;
  const job = await Job.findById(id);
  if (!job) throw new NotFoundError(`No Job with that provided id ${id}`);
  const admin = req.user.role === "admin";
  const isOwner = req.user.id === job.createdBy.toString();
  if (!admin && !isOwner)
    throw new UnauthorizedError("Not authorized to access that route");
  res.status(200).json({
    job,
  });
};

export const editJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
  if (!job) throw new NotFoundError(`No Job with that provided id ${id}`);
  const admin = req.user.role === "admin";
  const isOwner = req.user.id === job.createdBy.toString();
  if (!admin && !isOwner)
    throw new UnauthorizedError("Not authorized to access that route");
  res.status(200).json({ message: "Job Modified", job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);
  if (!job) throw new NotFoundError(`No Job with that provided id ${id}`);
  const admin = req.user.role === "admin";
  const isOwner = req.user.id === job.createdBy.toString();
  if (!admin && !isOwner)
    throw new UnauthorizedError("Not authorized to access that route");
  res.status(200).json({ message: "Job Deleted!" });
};

export const stats = async (req, res) => {
  let stat = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stat = stat.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  const defaultStats = {
    pending: stat.pending || 0,
    interview: stat.interview || 0,
    declined: stat.declined || 0,
  };

  let monthlyApplication = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();
  // const monthlyApplication = [
  //   {
  //     date: "22-May",
  //     count: 12,
  //   },
  //   {
  //     date: "22-June",
  //     count: 19,
  //   },
  //   {
  //     date: "22-July",
  //     count: 20,
  //   },
  // ];

  res.status(200).json({ defaultStats, monthlyApplication });
};
