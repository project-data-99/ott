"use client";

import Link from "next/link";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { loginSchema } from "@/schemas";
import { FormInput } from "@/components";
import { login, setAuthError } from "@/store/slices/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
        values,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const token = response.data.data.accessToken;
      dispatch(
        login({
          error: null,
          user: response.data.data.user,
          isAuthenticated: true,
          token,
          tokenExpiration: response.data.tokenExpiration,
        })
      );
      localStorage.setItem("authToken", token);
      return token;
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
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <>
      <section className="section"></section>
      <section className="section-lg">
        <div className="container">
          <div className="w-4/12 mx-auto">
            <h3 className="heading mb-10">Sign In</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-7 mb-7">
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
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password}
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
                {isSubmitting ? "Submitting" : "Login"}
              </button>
              <p className="mt-5">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary">
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
