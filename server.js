import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import jobRouter from "./routes/jobsRoutes.js";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ msg: "Hello from server!" });
});

app.use("/api/v1/jobs", authMiddleware, jobRouter);
app.use("/api/v1/", router);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Not Found!" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something, went wrong. please try again!";
  res.status(statusCode).json({ message });
});

const Port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.DB);
  app.listen(Port, () => {
    console.log(`Server and Database connected at port ${Port}`);
  });
} catch (error) {
  console.log(error);
}
