import mongoose from "mongoose";

import Genre from "../models/genre.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { notEmptyValidation } from "../utils/validators.js";

// Fetch All Genres Controller
export const fetchGenreController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get All Genres
   * TODO: Sending Response
   * **/

  // * Get All Genres
  const genres = await Genre.find();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, genres, "Fetched Genres Successfully!"));
});

// Fetch Genres Detail Controller
export const fetchGenresDetailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from Params
   * TODO: Fetch Detail
   * TODO: Sending Response
   * **/

  // * Get Id from Params
  const { id } = req.params;

  // * Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Genre ID");
  }

  // * Get Single Genre
  const genre = await Genre.findById(id);

  // * Check if Genre exists
  if (!genre) throw new ApiError(404, "Genre not found");

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, genre, "Fetched Genre Details Successfully!"));
});

// * Admin Controls

// Create Genre Controller
export const createGenreController = asyncHandler(async (req, res) => {
  /**
   * TODO: Validate Input
   * TODO: Create New Genre
   * TODO: Send Response
   * **/

  // * Get data from Frontend
  const { name, description } = req.body;

  // * Validate Input
  notEmptyValidation([name, description]);
  const nameExist = await Genre.findOne({ name });
  if (nameExist) throw new ApiError(409, `${name} genre already exists`);

  // * Create New Genre
  const newGenre = new Genre({ name, description });
  await newGenre.save();

  // * Sending Response
  res
    .status(201)
    .json(new ApiResponse(201, newGenre, "Genre created successfully!"));
});

// Update Genre Controller
export const updateGenreController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from Params
   * TODO: Get Data from Frontend
   * TODO: Validate Input
   * TODO: Update Genre
   * TODO: Send Response
   **/

  // * Get Id from Params
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid genre ID");
  }
  const genre = await Genre.findById(id);
  if (!genre) throw new ApiError(404, "Genre not found");

  // * Get data from Frontend
  const { name, description } = req.body;

  // Check if the name has changed
  if (name !== genre.name) {
    // * Check if the new name already exists in the database
    const existingName = await Genre.findOne({ name });

    if (existingName) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Name already exists"));
    }
  }

  // * Update Genre
  genre.name = name;
  genre.description = description;
  await genre.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, genre, "Genre updated successfully!"));
});

// Delete Genre Controller
export const deleteGenreController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from Params
   * TODO: Delete Genre
   * TODO: Send Response
   **/

  // * Get Id from Params
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid genre ID");
  }

  // * Delete Genre
  await Genre.findByIdAndDelete(id);

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, null, "Genre deleted successfully!"));
});
