import User from "../models/userModel.js";
import statusCode from "http-status-codes";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import brcypt from "bcryptjs";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { UnauthorizedError } from "../errors/customErros.js";
import { createJWT } from "../utils/jwt.js";
import Job from "../models/jobModel.js";
export const register = async (req, res) => {
  const firstAccount = (await User.countDocuments()) === 0;
  req.body.role = firstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.json({ message: "User Created", user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const validUser = user && (await comparePassword(password, user.password));
  if (!validUser) throw new UnauthorizedError("Invalid Credentails");
  const token = createJWT({ id: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ msg: "Login Successfully" });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "Logged Out!" });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  const userWithoutPassword = user.toJSON();
  res.status(statusCode.OK).json({ user: userWithoutPassword });
};
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  if (req.user.role === "user") {
    throw new UnauthorizedError("Not accessed to that route");
  }
  res.status(statusCode.OK).json({ users, jobs });
};
export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  if (req.file) {
    const res = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    obj.avatar = res.secure_url;
    obj.avatarPublicId = res.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, obj);
  if (req.file && updateUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(statusCode.OK).json({ msg: "User updated" });
  console.log(req.user);
};
