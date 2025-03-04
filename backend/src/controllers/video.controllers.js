import fs from "fs";
import mongoose from "mongoose";

import Video from "../models/video.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { notEmptyValidation } from "../utils/validators.js";
import Cast from "../models/cast.model.js";

// Fetch All Videos
export const fetchAllVideosController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Videos
   * TODO: Sending Response
   * **/

  // * Fetch All Videos
  const videos = await Video.find()
    .populate("category")
    .populate("genres")
    .populate({
      path: "casts.cast",
    });

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, videos, "Vidoes fetched successfully!"));
});

// Create Video Controller
export const createVideoController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate Data
   * TODO: If Correct, Create Video
   * TODO: Sending Response
   * **/

  // * Get Data From Frontend
  const { title, description, duration, category, genres } = req.body;

  // * Validate Input
  notEmptyValidation([title, description, duration, category, genres]);

  // * Check if Video Exist
  const existingVideo = await Video.findOne({ title, category });
  if (existingVideo)
    throw new ApiError(409, `${title} video already exists in this category`);

  // * Create New Video
  const video = new Video({
    title,
    description,
    duration,
    category,
    genres,
  });
  await video.save();

  // * Sending Response
  res
    .status(201)
    .json(new ApiResponse(201, video, "Video created successfully!"));
});

// Upload Video Thumbnail Controller
export const uploadVideoThumbnailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Video Id from Query
   * TODO: Get file from Frontend
   * TODO: Upload File
   * TODO: Sending Response
   * **/

  // * Get Video Id from Query
  const { id } = req.params;

  // * Validate Video Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid video id");
  }

  // * Find Video by Id
  const video = await Video.findById(id);
  if (!video) throw new ApiError(404, "Video not found");

  // * Get File from Frontend
  const thumbnail = req.file?.path;
  if (!thumbnail) throw new ApiError(400, "No thumbnail provided");

  // * Update Video Thumbnail
  video.thumbnail_url = thumbnail;
  await video.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, video, "Video thumbnail updated successfully!"));
});

// Remove Video Thumbnail COntroller
export const removeVideoThumbnailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Video Id from Query
   * TODO: Remove File from Server
   * TODO: Update Video Thumbnail to null
   * TODO: Sending Response
   * **/

  // * Get Video Id from Query
  const { id } = req.params;

  // * Validate Video Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid video id");
  }

  // * Find Video by Id
  const video = await Video.findById(id);
  if (!video) throw new ApiError(404, "Video not found");

  // * Remove Video Thumbnail from Server
  if (video.thumbnail_url) {
    const thumbnailPath = video.thumbnail_url;
    await fs.promises.unlink(thumbnailPath);
  }

  // * Update Video Thumbnail to null
  video.thumbnail_url = undefined;
  await video.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, video, "Video thumbnail removed successfully!"));
});

// Upload Video Controller
export const uploadVideoController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Video Id from Query
   * TODO: Get file from Frontend
   * TODO: Upload File
   * TODO: Sending Response
   * **/

  // * Get Video Id from Query
  const { id } = req.params;

  // * Validate Video Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid video id");
  }

  // * Find Video by Id
  const videoExist = await Video.findById(id);
  if (!videoExist) throw new ApiError(404, "Video not found");

  // * Get File from Frontend
  const video = req.file?.path;

  if (!video) throw new ApiError(400, "No video provided");

  // * Update Video
  videoExist.video_url = video;
  await videoExist.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, videoExist, "Video updated successfully!"));
});

// Remove Video COntroller
export const removeVideoController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Video Id from Query
   * TODO: Remove File from Server
   * TODO: Update Video to null
   * TODO: Sending Response
   * **/

  // * Get Video Id from Query
  const { id } = req.params;

  // * Validate Video Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid video id");
  }

  // * Find Video by Id
  const video = await Video.findById(id);
  if (!video) throw new ApiError(404, "Video not found");

  // * Remove Video Thumbnail from Server
  if (video.video_url) {
    const videoPath = video.video_url;
    await fs.promises.unlink(videoPath);
  }

  // * Update Video Thumbnail to null
  video.video_url = undefined;
  await video.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, video, "Video removed successfully!"));
});

// Update Video Details Controller
export const updateVideoDetailsController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Video Id from Params
   * TODO: Get Data from Frontend
   * TODO: Validate Input
   * TODO: Update Video Details
   * TODO: Send Response
   * **/

  // * Get Video Id from Params
  const { id } = req.params;

  // * Validate Video Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid video id");
  }

  // * Find Video by Id
  const videoExist = await Video.findById(id);
  if (!videoExist) throw new ApiError(404, "Video not found");

  // * Get Data from Frontend
  const { title, description, duration, category, genres } = req.body;

  // * Update Video Details
  if (title) videoExist.title = title;
  if (description) videoExist.description = description;
  if (duration) videoExist.duration = duration;
  if (category) videoExist.category = category;
  if (genres) videoExist.genres = genres;
  await videoExist.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, videoExist, "Video updated successfully!"));
});

// Delete Video Controller
export const deleteVideoController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from params
   * TODO: Search Video and Delete
   * TODO: Sending Response
   * **/

  // * Get Id from Query
  const { id } = req.params;

  // * Validate Video Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid video id");
  }

  // * Find Video by Id
  const video = await Video.findByIdAndDelete(id);
  if (!video) throw new ApiError(404, "Video not found");

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, null, "Video deleted successfully!"));
});

// Add Casts to Video Controller
export const addVideoCastsController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Video Id from Params
   * TODO: Get data from Frontend
   * TODO: Validate Data
   * TODO: Update Cast
   * TODO: Sending Response
   **/

  // * Get Video Id from Params
  const { id } = req.params;

  // * Validate Video Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid video ID");
  }

  // * Find Video by Id
  const video = await Video.findById(id);
  if (!video) throw new ApiError(404, "Video not found");

  // * Get Data from Frontend
  const { castId, role } = req.body;

  // * Validate Cast Data
  notEmptyValidation([castId, role]);

  // * Validate Cast ID
  if (!mongoose.Types.ObjectId.isValid(castId)) {
    throw new ApiError(400, "Invalid cast ID");
  }

  // * Check if Cast Exists
  const cast = await Cast.findById(castId);
  if (!cast) throw new ApiError(404, "Cast not found");

  // * Check if Cast is Already Added to Video
  const castAlreadyExists = video.casts.some(
    (item) => item.cast.toString() === castId
  );

  if (castAlreadyExists) {
    throw new ApiError(400, "Cast already added to this video");
  }

  // * Add Cast to Video
  video.casts.push({ cast: castId, role });

  // * Save Updated Video
  await video.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, video, "Cast added to video successfully!"));
});

// Remove Cast from Video Controller
export const removeVideoCastController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from params
   * TODO: Delete data
   * TODO: Sending Response
   **/

  // * Get Video Id from Params
  const { id } = req.params;

  // * Validate Video Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid video ID");
  }

  // * Find Video by Id
  const video = await Video.findById(id);
  if (!video) throw new ApiError(404, "Video not found");

  // * Get Cast ID from Query
  const { castId } = req.query;

  // * Validate Cast ID
  if (!castId || !mongoose.Types.ObjectId.isValid(castId)) {
    throw new ApiError(400, "Invalid cast ID");
  }

  // * Check if Cast Exists in Video
  const castIndex = video.casts.findIndex((item) => {
    return item._id.toString() === castId;
  });

  if (castIndex === -1) {
    throw new ApiError(404, "Cast not found in this video");
  }

  // * Remove Cast from Video
  video.casts.splice(castIndex, 1);

  // * Save Updated Video
  await video.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, video, "Cast removed from video successfully!"));
});

// Update Cast from Video Controller
export const updateVideoCastController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Id from params
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: Update Cast
   * TODO: Sending Response
   * **/

  // * Get Video Id from Params
  const { id } = req.params;

  // * Validate Video Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid video ID");
  }

  // * Find Video by Id
  const video = await Video.findById(id);
  if (!video) throw new ApiError(404, "Video not found");

  // * Get Cast ID from Query
  const { castId } = req.query;

  // * Validate Cast ID
  if (!castId || !mongoose.Types.ObjectId.isValid(castId)) {
    throw new ApiError(400, "Invalid cast ID");
  }

  // * Check if Cast Exists in Video
  const castIndex = video.casts.findIndex((item) => {
    return item._id.toString() === castId;
  });

  if (castIndex === -1) {
    throw new ApiError(404, "Cast not found in this video");
  }

  // * Get Data from Frontend
  const { role } = req.body;
  if (role) video.casts[castIndex].role = role;
  await video.save();

  // * Sending Response
  res
    .status(200)
    .json(new ApiResponse(200, video, "Cast updated in video successfully!"));
});
