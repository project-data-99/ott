import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
  compareFieldValidation,
} from "../utils/validators.js";
import {
  generateAccessRefreshToken,
  generateVerificationToken,
  options,
  generate20CharToken,
  generatePasswordResetToken,
} from "../utils/generateToken.js";

// Fetch User Profile Controller
export const fetchUserProfileController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get User from Request
   * TODO: Send Response
   * **/

  // * Get User from Request
  const requestUser = req.user;
  const user = await User.findById(requestUser._id);

  const role = new mongoose.Types.ObjectId(req.user.role);
  const adminRole = await UserRole.findOne({ name: "admin" }).lean();

  const isAdmin = adminRole && role.equals(adminRole._id);

  // * Sending Response
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, isAdmin },
        "Fetched User Profile Successfully!"
      )
    );
});

// Register Controller
export const registerController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate Data
   * TODO: Check if user exist
   * TODO: Create new user
   * TODO: Sending Response
   * **/

  // * Get Data From Frontend
  const { email, firstName, lastName, phoneNumber, password, password2 } =
    req.body;

  // * Validation Check
  notEmptyValidation([email, firstName, password]);
  emailValidation(email);
  phoneNumberValidation(phoneNumber);
  passwordValidation(password);
  compareFieldValidation(password, password2, "Passwords does not match");

  // * Check If user Exists
  const emailExist = await User.findOne({ email });
  const phoneExist = await User.findOne({ phoneNumber });
  if (emailExist) {
    throw new ApiError(409, "User with email already exists");
  }
  if (phoneExist) {
    throw new ApiError(409, "User with phone already exists");
  }

  // * Adding Role
  const userRole = await UserRole.findOne({ name: "user" });
  if (!userRole) {
    throw new ApiError(
      500,
      "Default role not found, please setup UserRole collection"
    );
  }

  // * Create New User
  const createdUser = await User.create({
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    role: userRole._id,
    lastLogin: new Date(),
  });

  // * Check if user is created
  const user = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(500, "Error creating user, Please try again!");
  }

  // * Save Verification Code
  const token = generate20CharToken();
  generateVerificationToken(user._id, token);
  //   sendVerificationCodeEmail(user.email, token);

  // * Sending Response
  return res.status(201).json(new ApiResponse(200, user, "User registered!"));
});

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
  if (!user.role || user.role.name !== "user") {
    throw new ApiError(403, "Access Denied: Only users can log in.");
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
          accessToken,
          refreshToken,
        },
        "User logged in successfully!"
      )
    );
});

// Logout Controller
export const logoutController = asyncHandler(async (req, res) => {
  /**
   * TODO: Update token in backend
   * TODO: Delete cookie from frontend
   * TODO: Sending Response
   * **/

  // * Update token in backend
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  // * Sending Response & Delete cookie from frontend
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out!"));
});

// Refresh Access Token Controller
export const refreshAccessTokenController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Refresh token from cookie
   * TODO: Decode Refresh Token
   * TODO: Check if user exists
   * TODO: Compare cookie refresh token with refresh token stored in database
   * TODO: Generate new access token
   * TODO: Sending Response
   * **/

  // * Get Refresh token from cookie or body
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  try {
    // * Decode refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // * Check if user exists
    const user = await User.findById(decodedToken._id).select("refreshToken");
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // * Compare cookie refresh token with refresh token stored in database
    if (incomingRefreshToken !== user.refreshToken) {
      return res.status(401).json({ message: "Refresh token is expired!" }); // Fix: Added return
    }

    // * Generate new access token
    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      user._id
    );

    // * Save new refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // * Sending Response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed!"
        )
      );
  } catch (error) {
    throw new ApiError(
      401,
      error.message || "Invalid or expired refresh token"
    );
  }
});

// Forgot Password Controller
export const forgotPasswordController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get email from frontend
   * TODO: Validate data
   * TODO: Check if user exists
   * TODO: Sending Email with password reset token
   * TODO: Sending Response
   * **/

  // * Get email from frontend
  const { email, phoneNumber } = req.body;

  // * Validate data
  if (!email && !phoneNumber) {
    throw new ApiError(400, "Please enter your email or phone number.");
  }
  if (email) emailValidation(email);
  if (phoneNumber) phoneNumberValidation(phoneNumber);

  // * Check if user exists
  const user = await User.findOne({ $or: [{ email }, { phoneNumber }] });
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  // * Sending Email with password reset token
  const token = generate20CharToken();
  generatePasswordResetToken(user._id, token);
  // ! if (email) sendPasswordResetEmail(user.email, user.firstName, token);
  // ! if (phoneNumber) sendPasswordResetMessage(user.phoneNumber, user.firstName, token);

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset link sent to your email"));
});

// Forgot Password Request Controller
export const forgotPasswordRequestController = asyncHandler(
  async (req, res) => {
    /**
     * TODO: Get token from URL
     * TODO: Check if token is valid
     * TODO: Get data from Frontend
     * TODO: Validate data
     * TODO: Update new password
     * TODO: Sending Response
     * **/

    // * Get token from URL
    const { token } = req.query;

    // * Check if token is valid
    const user = await User.findOne({ passwordResetToken: token });
    if (!user) {
      throw new ApiError(400, "Invalid token");
    }

    const currentDate = new Date();
    if (currentDate > user.passwordResetTokenExpiry) {
      throw new ApiError(400, "Password reset token has expired");
    }

    // * Get data from Frontend
    const { password, password2 } = req.body;

    // * Validate data
    notEmptyValidation([password, password2]);
    passwordValidation(password);
    compareFieldValidation(password, password2, "Password does not match");

    // * Update new password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();

    // * Sending Response
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password updated successfully!"));
  }
);

// Reset Password Controller
export const resetPasswordController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: check if old password is correct
   * TODO: Update password to new password
   * TODO: Sending Response
   * **/

  // * Get data from frontend
  const { oldPassword, password, password2 } = req.body;

  // * Validate data
  notEmptyValidation([oldPassword, password, password2]);
  passwordValidation(password);
  if (oldPassword === password) {
    throw new ApiError(400, "Old password cannot be same as new password");
  }
  compareFieldValidation(password, password2, "Password does not match");

  // * Check if old password is correct
  const user = await User.findById(req.user._id).select("password");
  const passwordCheck = await user.isPasswordCorrect(oldPassword);
  if (!passwordCheck) {
    throw new ApiError(400, "Old password is incorrect");
  }

  // * Update password to new password
  user.password = password;
  await user.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully!"));
});

// Update User Profile Controller
export const updateProfileController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: Update user profile
   * TODO: Send Response with user profile
   * **/

  // * Get data from frontend
  const { firstName, lastName, email, phoneNumber, dateOfBirth } = req.body;

  // * Validate data
  notEmptyValidation([firstName, email, phoneNumber]);
  emailValidation(email);
  phoneNumberValidation(phoneNumber);

  try {
    // * Find the user by ID
    const user = await User.findById(req.user._id);

    // Check if the email has changed
    if (email !== req.user.email) {
      // * Check if the new email already exists in the database
      const existingEmailUser = await User.findOne({ email });

      if (existingEmailUser) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Email already exists"));
      }
    }

    // Check if the phone number has changed
    if (phoneNumber !== req.user.phoneNumber) {
      // * Check if the new phone number already exists in the database
      const existingPhoneNumber = await User.findOne({ phoneNumber });

      if (existingPhoneNumber) {
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Phone Number already exists"));
      }
    }

    // * Update user profile
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.dateOfBirth = dateOfBirth;
    await user.save();

    // * Updated User
    const updatedUser = await User.findById(user._id);

    // * Sending Response
    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully!"));
  } catch (error) {
    throw new ApiError(500, `Server Error : ${error.message}`);
  }
});

// Update Avatar Controller
export const updateAvatarController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get File from frontend
   * TODO: Upload File
   * TODO: Sending Response
   * **/

  // * Get File from frontend
  const avatar = req.file?.path;
  if (!avatar) {
    throw new ApiError(400, "Please upload an image");
  }

  // * Upload file
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { avatar } },
    { new: true }
  );

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image uploaded successfully!"));
});
