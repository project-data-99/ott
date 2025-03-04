import mongoose from "mongoose";

import Category from "../models/category.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { notEmptyValidation } from "../utils/validators.js";

// Fetch All Categories Controller
export const fetchCategoriesController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get All Categories
   * TODO: Send Response
   * **/

  // * Get All Categories
  const categories = await Category.find();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, categories, "Fetched Categories Successfully!"));
});

// Fetch Category Detail Controller
export const fetchCategoryDetailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from Params
   * TODO: Fetch Detail
   * TODO: Sending Response
   * **/

  const { slug } = req.params;

  // * Get Single Category
  const category = await Category.findOne({ slug });

  // * Check if Category exists
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, category, "Fetched Category Successfully!"));
});

// Fetch Category Detail Controller using Id
export const fetchCategoryDetailIdController = asyncHandler(
  async (req, res) => {
    /**
     * TODO: Get Id from Params
     * TODO: Fetch Detail
     * TODO: Sending Response
     * **/

    const { id } = req.params;

    // * Get Single Category
    const category = await Category.findById(id);

    // * Check if Category exists
    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    // * Sending Response
    res
      .status(200)
      .json(new ApiResponse(200, category, "Fetched Category Successfully!"));
  }
);

// * Admin Controls

// Create Category Controller
export const createCategoryController = asyncHandler(async (req, res) => {
  /**
   * TODO: Validate Input
   * TODO: Create New Category
   * TODO: Send Response
   * **/

  const { name, description } = req.body;

  // * Validate Input
  notEmptyValidation([name, description]);
  const nameExist = await Category.findOne({ name });
  if (nameExist) throw new ApiError(409, `${name} category already exists`);

  // * Create New Category
  const newCategory = new Category({ name, description });
  await newCategory.save();

  // * Sending Response
  res
    .status(201)
    .json(new ApiResponse(201, newCategory, "Category created successfully!"));
});

// Update Category Controller
export const updateCategoryController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from Params
   * TODO: Get Data from Frontend
   * TODO: Validate Input
   * TODO: Update Category
   * TODO: Send Response
   **/

  // * Get Id from Params
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid category ID");
  }
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  // * Get data from Frontend
  const { name, description } = req.body;

  // Check if the name has changed
  if (name !== category.name) {
    // * Check if the new name already exists in the database
    const existingName = await Category.findOne({ name });

    if (existingName) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Name already exists"));
    }
  }

  // * Update Category
  category.name = name;
  category.description = description;
  await category.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully!"));
});

// Delete Category Controller
export const deleteCategoryController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from Params
   * TODO: Delete Category
   * TODO: Send Response
   **/

  // * Get Id from Params
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid category ID");
  }

  // * Delete Category
  await Category.findByIdAndDelete(id);

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully!"));
});
