import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import UserRole from "../models/user-role.model.js";

// Verify that the user is authenticated
export const verifyUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(201, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

// Check if the user is verified
export const isUserVerified = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.verified) {
      throw new ApiError(
        400,
        `Please verify your account before changing the role`
      );
    }

    next();
  } catch (error) {
    throw new ApiError(400, error?.message);
  }
});

// Check if the user is an Admin
export const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const role = new mongoose.Types.ObjectId(req.user.role);
    const adminRole = await UserRole.findOne({ name: "admin" });

    if (!adminRole || !role.equals(adminRole._id)) {
      throw new ApiError(400, "You are not an Admin");
    }

    next();
  } catch (error) {
    throw new ApiError(400, error?.message);
  }
});
