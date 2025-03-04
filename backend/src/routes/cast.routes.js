import { Router } from "express";
import {
  createCastController,
  deleteCastController,
  fetchCastDetailController,
  fetchCastsController,
  updateCastController,
} from "../controllers/cast.controllers.js";
import uploadMiddleware from "../middlewares/multer.middlewares.js";
import { isAdmin, verifyUser } from "../middlewares/auth.middlewares.js";

const router = Router();

// Upload folders
const avatarUpload = uploadMiddleware("cast_avatar");

// Routes
router.route("/all").get(fetchCastsController);
router.route("/:id").get(fetchCastDetailController);

router.route("/").post(verifyUser, isAdmin, avatarUpload, createCastController);
router
  .route("/:id")
  .patch(verifyUser, isAdmin, avatarUpload, updateCastController);
router.route("/:id").delete(verifyUser, isAdmin, deleteCastController);

export default router;
