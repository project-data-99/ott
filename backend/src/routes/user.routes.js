import { Router } from "express";
import {
  fetchUserProfileController,
  forgotPasswordController,
  forgotPasswordRequestController,
  loginController,
  logoutController,
  refreshAccessTokenController,
  registerController,
  resetPasswordController,
  updateAvatarController,
  updateProfileController,
} from "../controllers/user.controllers.js";
import uploadMiddleware from "../middlewares/multer.middlewares.js";
import { verifyUser } from "../middlewares/auth.middlewares.js";

const router = Router();

// Upload folders
const avatarUpload = uploadMiddleware("avatar");

// Routes
router.route("/get-user-profile").get(verifyUser, fetchUserProfileController);

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").post(verifyUser, logoutController);

router.route("/refresh-access-token").post(refreshAccessTokenController);

router.route("/forgot-password").post(forgotPasswordController);
router.route("/forgot-password-request").patch(forgotPasswordRequestController);
router.route("/reset-password").patch(verifyUser, resetPasswordController);

router.route("/update-profile").patch(verifyUser, updateProfileController);
router
  .route("/update-avatar")
  .patch(verifyUser, avatarUpload, updateAvatarController);

export default router;
