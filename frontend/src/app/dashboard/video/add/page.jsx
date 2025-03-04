"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { showAlert } from "@/store/slices/alertSlice";
import { FormInput, FormTextarea, FormSelect } from "@/components";
import { videoSchema } from "@/schemas";

const AddVideo = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);

  // Fetch Category Options
  const fetchCategoryOptions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/all`
      );
      setCategoryOptions(
        response.data.data.map((category) => ({
          value: category._id,
          label: category.name,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Genre Options
  const fetchGenreOptions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/genres/all`
      );

      setGenreOptions(
        response.data.data.map((genre) => ({
          value: genre._id,
          label: genre.name,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryOptions();
    fetchGenreOptions();
  }, []);

  // Handle Video Add
  const handleAddVideo = async (values, { setErrors, setSubmitting }) => {
    console.log("Submittnig");

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("duration", values.duration);
      formData.append("category", values.category);
      values.genres.forEach((genre) => {
        formData.append("genres[]", genre);
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/videos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response);

      dispatch(
        showAlert({
          type: "success",
          message: "Video added successfully",
        })
      );
      router.push("/dashboard/video");
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

  //   Formik
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      duration: "",
      category: "",
      genres: [],
    },
    validationSchema: videoSchema,
    onSubmit: handleAddVideo,
  });

  return (
    <>
      <div className="flex items-center justify-between gap-10 mb-10">
        <h4 className="text-2xl font-bold">Add Video</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Title"
          type="text"
          name="title"
          placeholder="Title"
          className="mb-5"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title && touched.title}
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

        <FormInput
          label="Duration"
          type="text"
          name="duration"
          placeholder="Duration"
          className="mb-5"
          value={values.duration}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.duration && touched.duration}
        />

        <FormSelect
          label="Category"
          name="category"
          className="mb-5"
          required
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          options={categoryOptions}
          error={errors.category && touched.category}
        />

        <FormSelect
          label="Genres"
          name="genres"
          className="mb-5"
          required
          value={Array.isArray(values.genres) ? values.genres : []}
          onChange={(e) => {
            const selectedGenres = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            handleChange({ target: { name: "genres", value: selectedGenres } });
          }}
          onBlur={handleBlur}
          options={genreOptions}
          multiple={true}
          error={errors.genres && touched.genres}
        />

        {errors.apiError && (
          <span className="block text-sm text-red-500 mb-4">
            {errors.apiError}
          </span>
        )}

        <button className="button w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Create Video"}
        </button>
      </form>
    </>
  );
};

export default AddVideo;
