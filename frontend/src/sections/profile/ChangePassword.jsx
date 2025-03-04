"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { FormInput } from "@/components";
import { logout, setAuthError } from "@/store/slices/authSlice";
import { changePasswordSchema } from "@/schemas";

const ChangePassword = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/reset-password`,
        values,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Clear all storage
      localStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Reset the Redux store
      dispatch(logout());
      setDropdownActive(false);
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const apiError = error.response.data.message || "An error occured";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      } else if (error.request) {
        const apiError =
          error.response.data.message || "No response from server";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      } else {
        const apiError =
          error.response.data.message ||
          "An error occurred while making the request";
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
    initialValues: {
      oldPassword: "",
      password: "",
      password2: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit,
  });

  return (
    <>
      <section className="section"></section>
      <section className="section">
        <div className="container">
          <div className="w-4/12 mx-auto">
            <h1 className="heading mb-5">Change Password</h1>
            <p className="mb-10">
              <span className="text-primary font-semibold">Note: </span>Changing
              password will logout you, you will have to login with the updated
              password again.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-7 mb-7">
                <FormInput
                  label="Old Password"
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.oldPassword && touched.oldPassword}
                />
                <FormInput
                  label="New Password"
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password}
                />
                <FormInput
                  label="Confirm Password"
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password2 && touched.password2}
                />
              </div>

              {errors.apiError && (
                <span className="block text-sm text-red-500 mb-4">
                  {errors.apiError}
                </span>
              )}

              <button
                type="submit"
                className="button w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
