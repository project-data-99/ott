"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import { showAlert } from "@/store/slices/alertSlice";
import { hideModal } from "@/store/slices/modalSlice";
import { FormInput, FormTextarea } from "@/components";
import { categorySchema } from "@/schemas";

const UpdateCategoryForm = ({ categoryId }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Category Details
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${categoryId}`
        );
        setCategory(response.data.data);
      } catch (error) {
        console.error(error);
        dispatch(
          showAlert({ message: "Failed to fetch category", type: "error" })
        );
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchCategory();
  }, [categoryId, dispatch]);

  // Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: category?.name || "",
      description: category?.description || "",
    },
    validationSchema: categorySchema,
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

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${categoryId}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(
          showAlert({
            message: response.data.message || "Category updated successfully",
            type: "success",
          })
        );
        dispatch(hideModal());
      } catch (error) {
        console.log(error);

        dispatch(
          showAlert({ message: "Error updating category", type: "error" })
        );
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
        placeholder="Category Name"
        className="mb-5"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.name && formik.touched.name}
      />

      <FormTextarea
        label="Description"
        name="description"
        placeholder="Category Description"
        className="mb-5"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.description && formik.touched.description}
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
        {formik.isSubmitting ? "Updating..." : "Update Category"}
      </button>
    </form>
  );
};

export default UpdateCategoryForm;
