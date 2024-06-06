import express from "express";
import {
  getApplicationStats,
  getCurrentUser,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/userControllers.js";
import {
  updateValidation,
  validateLogin,
  validateRegister,
} from "../middlewares/validator.js";
import {
  authMiddleware,
  checkTestUser,
} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
const router = express.Router();

router.route("/auth/register").post(validateRegister, register);
router.route("/auth/login").post(validateLogin, login);
router.route("/auth/logout").get(logout);

router.route("/current-user").get(authMiddleware, getCurrentUser);
router.route("/admin/app-stats").get(authMiddleware, getApplicationStats);
router
  .route("/update-user")
  .patch(
    checkTestUser,
    authMiddleware,
    upload.single("avatar"),
    updateValidation,
    updateUser
  );

export default router;
