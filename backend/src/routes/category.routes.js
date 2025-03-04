import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  fetchCategoriesController,
  fetchCategoryDetailController,
  fetchCategoryDetailIdController,
  updateCategoryController,
} from "../controllers/category.controllers.js";
import { isAdmin, verifyUser } from "../middlewares/auth.middlewares.js";

const router = Router();

// Routes
router.route("/all").get(fetchCategoriesController);
router.route("/slug/:slug").get(fetchCategoryDetailController);
router.route("/:id").get(fetchCategoryDetailIdController);

router.route("/").post(verifyUser, isAdmin, createCategoryController);
router.route("/:id").patch(verifyUser, isAdmin, updateCategoryController);
router.route("/:id").delete(verifyUser, isAdmin, deleteCategoryController);

export default router;
