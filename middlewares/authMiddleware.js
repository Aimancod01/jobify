import { BadRequestError, UnauthorizedError } from "../errors/customErros.js";
import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthorizedError("authentication invalid");
  try {
    const { id, role } = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = id === "6654a7ba5b9ca69a255b5c2a";
    req.user = { id, role, testUser };
    next();
  } catch (error) {
    throw new UnauthorizedError("authentication invalid");
  }
};

export const checkTestUser = async (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo User, Read Only!");
  next();
};
