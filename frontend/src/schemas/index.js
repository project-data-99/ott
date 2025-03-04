import * as yup from "yup";

// Minimum 6, 1 uppercase, 1 lowercase, 1 numeric digit
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

// Register Schema Validation
export const registerSchema = yup.object().shape({
  firstName: yup.string().required("Please enter First Name"),
  lastName: yup.string().nullable(),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter Email Address"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number")
    .required("Please enter Phone Number"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required("Please enter Password"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your Password"),
});

// Login Schema Validation
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter Email Address"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required("Please enter Password"),
});

// Change Password Validation
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required("Please enter Old Password"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required("Please enter New Password"),
  password2: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required("Please Confirm Password"),
});

// Profile Update Schema Validation
export const profileUpdateSchema = yup.object().shape({
  firstName: yup.string().required("Please enter First Name"),
  lastName: yup.string().nullable(),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter Email Address"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number")
    .required("Please enter Phone Number"),
  dateOfBirth: yup.date().nullable(),
});

// Category Schema Validation
export const categorySchema = yup.object().shape({
  name: yup.string().required("Please enter Category Name"),
  description: yup.string().required("Please enter Category Description"),
});

// Genre Schema Validation
export const genreSchema = yup.object().shape({
  name: yup.string().required("Please enter Genre Name"),
  description: yup.string().required("Please enter Genre Description"),
});

// Cast Schema Validation
export const castSchema = yup.object().shape({
  name: yup.string().required("Please enter Cast Name"),
});

// Video Schema Validation
export const videoSchema = yup.object().shape({
  title: yup.string().required("Please enter Movie Title"),
  description: yup.string().required("Please enter Movie Description"),
  duration: yup.string().required("Please enter Release Date"),
  category: yup.object().required("Please select a Category"),
  genres: yup
    .array()
    .min(1, "At least one genre is required")
    .required("Genres are required"),
});
