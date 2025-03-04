"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import { showAlert } from "@/store/slices/alertSlice";
import { hideModal } from "@/store/slices/modalSlice";
import { FormInput } from "@/components";
import { castSchema } from "@/schemas";

const UpdateCastForm = ({ castId }) => {
  const dispatch = useDispatch();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Cast Details
  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/casts/${castId}`
        );
        setCast(response.data.data);
      } catch (error) {
        console.error(error);
        dispatch(showAlert({ message: "Failed to fetch Cast", type: "error" }));
      } finally {
        setLoading(false);
      }
    };

    if (castId) fetchCast();
  }, [castId, dispatch]);

  // Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: cast?.name || "",
      cast_avatar: null, // Store file as null initially
    },
    validationSchema: castSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          dispatch(
            showAlert({
              message: "Unauthorized: No token found",
              type: "error",
            })
          );
          return;
        }

        // Create FormData object for file upload
        const formData = new FormData();
        formData.append("name", values.name);
        if (values.cast_avatar) {
          formData.append("cast_avatar", values.cast_avatar);
        }

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/casts/${castId}`,
          formData, // Send FormData instead of JSON
          {
            headers: {
              "Content-Type": "multipart/form-data", // Required for file uploads
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(
          showAlert({
            message: response.data.message || "Cast updated successfully",
            type: "success",
          })
        );
        dispatch(hideModal());
      } catch (error) {
        console.error(error);
        dispatch(showAlert({ message: "Error updating cast", type: "error" }));
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormInput
        label="Name"
        type="text"
        name="name"
        placeholder="Cast Name"
        className="mb-5"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.name && formik.touched.name}
      />

      {/* ✅ Fix: Correct file input handling */}
      <FormInput
        label="Avatar"
        type="file"
        name="cast_avatar"
        className="mb-5"
        onChange={(event) => {
          const file = event.target.files[0];
          formik.setFieldValue("cast_avatar", file); // Correct usage of setFieldValue
        }}
        onBlur={formik.handleBlur}
        error={formik.errors.cast_avatar && formik.touched.cast_avatar}
      />

      {formik.errors.apiError && (
        <span className="block text-sm text-red-500 mb-4">
          {formik.errors.apiError}
        </span>
      )}

      <button
        className="button w-full"
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Updating..." : "Update Cast"}
      </button>
    </form>
  );
};

export default UpdateCastForm;
