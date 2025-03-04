import mongoose from "mongoose";

import Cast from "../models/cast.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { notEmptyValidation } from "../utils/validators.js";

// Fetch All Casts Controller
export const fetchCastsController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get All Casts
   * TODO: Sending Response
   * **/

  // * Get all Casts
  const casts = await Cast.find();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, casts, "Fetched Casts Successfully!"));
});

// Fetch Cast Detail Controller
export const fetchCastDetailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from Params
   * TODO: Fetch Detail
   * TODO: Sending Response
   * **/

  // * Get Id from Params
  const { id } = req.params;

  // * Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Cast ID");
  }

  // * Get Single Cast
  const cast = await Cast.findById(id);

  // * Check if Cast exists
  if (!cast) throw new ApiError(404, "Cast not found");

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, cast, "Fetched Cast Details Successfully!"));
});

// * Admin Controls

// Create Cast Controller
export const createCastController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: Create new Cast
   * TODO: Sending Response
   * **/

  // * Get data from frontend
  const { name } = req.body;
  const cast_avatar = req.file?.path;

  // * Validate Input
  notEmptyValidation([name]);

  // * Create new Cast
  const cast = new Cast({ name, cast_avatar });
  await cast.save();

  // * Sending Response
  res
    .status(201)
    .json(new ApiResponse(201, cast, "Created Cast Successfully!"));
});

// Update Cast Controller
export const updateCastController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from Params
   * TODO: Get Data from Frontend
   * TODO: Validate Input
   * TODO: Update Cast
   * TODO: Send Response
   **/

  // * Get Id from Params
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid cast ID");
  }
  const cast = await Cast.findById(id);
  if (!cast) throw new ApiError(404, "Cast not found");

  // * Get data from Frontend
  const { name } = req.body;
  const cast_avatar = req.file?.path;

  // * Validate Input
  notEmptyValidation([name]);

  // * Update Cast
  cast.name = name;
  cast.cast_avatar = cast_avatar;
  await cast.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, cast, "Updated Cast Successfully!"));
});

// Delete Cast Controller
export const deleteCastController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from Params
   * TODO: Delete Cast
   * TODO: Send Response
   **/

  // * Get Id from Params
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid cast ID");
  }

  // * Delete Cast
  await Cast.findByIdAndDelete(id);

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, null, "Deleted Cast Successfully!"));
});
