"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { showAlert } from "@/store/slices/alertSlice";
import { FormInput, FormTextarea } from "@/components";
import { genreSchema } from "@/schemas";

const AddGenre = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle Genre Add
  const handleAddGenre = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/genres`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(
        showAlert({
          type: "success",
          message: response.data.message || "Genre added successfully",
        })
      );

      router.replace("/dashboard/genre");
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const apiError = error.response.data.message || "An error occurred";
        setErrors({ apiError });
      } else if (error.request) {
        const apiError = "No response from server";
        setErrors({ apiError });
      } else {
        const apiError = "An error occurred while making the request";
        setErrors({ apiError });
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
    initialValues: { name: "", description: "" },
    validationSchema: genreSchema,
    onSubmit: handleAddGenre,
  });

  return (
    <>
      <div className="flex items-center justify-between gap-10 mb-10">
        <h4 className="text-2xl font-bold">Add Genre</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          name="name"
          placeholder="Name"
          className="mb-5"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name && touched.name}
        />

        <FormTextarea
          label="Description"
          name="description"
          placeholder="Description"
          className="mb-5"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.description && touched.description}
        />

        {errors.apiError && (
          <span className="block text-sm text-red-500 mb-4">
            {errors.apiError}
          </span>
        )}

        <button className="button w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Create Genre"}
        </button>
      </form>
    </>
  );
};

export default AddGenre;
