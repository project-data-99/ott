import ApiError from "./apiError.js";

export const notEmptyValidation = (fields) => {
  if (fields.some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  return fields;
};

// Email Validation
export const emailValidation = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please enter a valid email!");
  }
  return email;
};

// Password Validation
export const passwordValidation = (password) => {
  if (password.length <= 6) {
    throw new ApiError(400, "Password length must be minimum 6 characters");
  }
  return password;
};

// Phone Number Validation
export const phoneNumberValidation = (phoneNumber) => {
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phoneNumber)) {
    throw new ApiError(400, "Please enter a valid phone number");
  }
  return phoneNumber;
};

// Compare Field Validation
export const compareFieldValidation = (input1, input2, errMessage) => {
  if (input1 !== input2) {
    throw new ApiError(400, errMessage || "Two inputs value does not match");
  }
  return true;
};
