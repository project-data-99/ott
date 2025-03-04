"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { showAlert } from "@/store/slices/alertSlice";
import { FormInput } from "@/components";
import { castSchema } from "@/schemas";

const AddCast = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle Cast Add
  const handleAddCast = async (values, { setErrors, setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("cast_avatar", values.cast_avatar);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/casts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      dispatch(
        showAlert({
          type: "success",
          message: response.data.message || "Cast added successfully",
        })
      );

      router.replace("/dashboard/cast");
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
    setFieldValue,
  } = useFormik({
    initialValues: { name: "", cast_avatar: "" },
    validationSchema: castSchema,
    onSubmit: handleAddCast,
  });

  return (
    <>
      <div className="flex items-center justify-between gap-10 mb-10">
        <h4 className="text-2xl font-bold">Add Cast</h4>
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

        <FormInput
          label="Avatar"
          type="file"
          name="cast_avatar"
          placeholder="Avatar"
          className="mb-5"
          onChange={(event) => {
            const file = event.target.files[0];
            setFieldValue("cast_avatar", file);
          }}
          onBlur={handleBlur}
          error={errors.cast_avatar && touched.cast_avatar}
        />

        {errors.apiError && (
          <span className="block text-sm text-red-500 mb-4">
            {errors.apiError}
          </span>
        )}

        <button className="button w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Create Cast"}
        </button>
      </form>
    </>
  );
};

export default AddCast;
