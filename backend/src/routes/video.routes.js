import { Router } from "express";
import {
  addVideoCastsController,
  createVideoController,
  deleteVideoController,
  fetchAllVideosController,
  removeVideoCastController,
  removeVideoController,
  removeVideoThumbnailController,
  updateVideoCastController,
  updateVideoDetailsController,
  uploadVideoController,
  uploadVideoThumbnailController,
} from "../controllers/video.controllers.js";
import uploadMiddleware from "../middlewares/multer.middlewares.js";
import { verifyUser, isAdmin } from "../middlewares/auth.middlewares.js";

const router = Router();

// Upload folders
const videoUpload = uploadMiddleware("video");
const thumbnailUpload = uploadMiddleware("thumbnail");

// Routes
router.route("/").get(fetchAllVideosController);
router.route("/").post(verifyUser, isAdmin, createVideoController);

router
  .route("/:id/thumbnail")
  .patch(verifyUser, isAdmin, thumbnailUpload, uploadVideoThumbnailController);
router
  .route("/:id/thumbnail-remove")
  .patch(verifyUser, isAdmin, removeVideoThumbnailController);

router
  .route("/:id/video")
  .patch(verifyUser, isAdmin, videoUpload, uploadVideoController);
router
  .route("/:id/video-remove")
  .patch(verifyUser, isAdmin, removeVideoController);

router
  .route("/:id/update")
  .patch(verifyUser, isAdmin, updateVideoDetailsController);
router.route("/:id/delete").delete(verifyUser, isAdmin, deleteVideoController);

router
  .route("/:id/add-cast")
  .patch(verifyUser, isAdmin, addVideoCastsController);
router
  .route("/:id/remove-cast")
  .patch(verifyUser, isAdmin, removeVideoCastController);
router
  .route("/:id/update-cast")
  .patch(verifyUser, isAdmin, updateVideoCastController);

export default router;
