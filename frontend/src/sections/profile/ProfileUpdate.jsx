"use client";

import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { FormInput } from "@/components";
import { profileUpdateSchema } from "@/schemas";
import { updateProfile, setAuthError } from "@/store/slices/authSlice";

const ProfileUpdate = ({ auth }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isUpdated, setIsUpdated] = useState(false);

  const sanitizeInput = (value) => (typeof value === "string" ? value : "");

  const initialValues = {
    email: sanitizeInput(auth.email),
    firstName: sanitizeInput(auth.firstName),
    lastName: sanitizeInput(auth.lastName),
    phoneNumber: sanitizeInput(auth.phoneNumber),
    dateOfBirth: auth.dateOfBirth
      ? new Date(auth.dateOfBirth).toISOString().split("T")[0]
      : "",
  };

  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update-profile`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(updateProfile(response.data.data));
      resetForm();
      setIsUpdated(true);
      router.push("/profile");
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const apiError = error.response.data.message || "An error occurred";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      } else if (error.request) {
        const apiError = "No response from server";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      } else {
        const apiError = "An error occurred while making the request";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      }
    }
  };

  // Formik
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: profileUpdateSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <h3 className="heading mb-10">Update Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-7 mb-7">
          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
          />
          <FormInput
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phoneNumber && touched.phoneNumber}
          />
          <FormInput
            label="First Name"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.firstName && touched.firstName}
          />
          <FormInput
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.lastName && touched.lastName}
          />
          <FormInput
            label="Date Of Birth"
            type="date"
            name="dateOfBirth"
            placeholder="Date Of Birth"
            value={values.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.dateOfBirth && touched.dateOfBirth}
          />
        </div>

        {errors.apiError && (
          <span className="block text-sm text-red-500 mb-4">
            {errors.apiError}
          </span>
        )}

        {isUpdated && (
          <div className="text-md text-primary mb-4">
            Profile updated successfully!
          </div>
        )}

        <button type="submit" className="button w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Update"}
        </button>
      </form>
    </>
  );
};

export default ProfileUpdate;
