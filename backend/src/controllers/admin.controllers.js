import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import UserRole from "../models/user-role.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import {
  emailValidation,
  notEmptyValidation,
  passwordValidation,
  phoneNumberValidation,
} from "../utils/validators.js";
import { generateAccessRefreshToken, options } from "../utils/generateToken.js";

// Login Controller
export const loginController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from user
   * TODO: Validate data
   * TODO: Check if user exists
   * TODO: Check Password
   * TODO: Generate Token
   * TODO: Sending Response
   * **/

  // * Get data from user
  const { email, phoneNumber, password } = req.body;

  // * Validate data
  notEmptyValidation([password]);
  if (!email && !phoneNumber) {
    throw new ApiError(400, "Please enter your email or phone number.");
  }
  if (email) emailValidation(email);
  if (phoneNumber) phoneNumberValidation(phoneNumber);
  passwordValidation(password);

  // * Check if user exists
  const user = await User.findOne({ $or: [{ email }, { phoneNumber }] })
    .select("password role")
    .populate("role", "name");
  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  // * Check if role is "user"
  if (!user.role || user.role.name !== "admin") {
    throw new ApiError(403, "Access Denied: Only admin can log in.");
  }

  // * Check Password
  const passwordCheck = await user.isPasswordCorrect(password);
  if (!passwordCheck) {
    throw new ApiError(401, "Invalid password");
  }

  // * Generate Token
  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id);

  // * Update Last Login
  user.lastLogin = new Date();
  await user.save();

  // * Sending Response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          isAdmin: true,
          accessToken,
          refreshToken,
        },
        "User logged in successfully!"
      )
    );
});
