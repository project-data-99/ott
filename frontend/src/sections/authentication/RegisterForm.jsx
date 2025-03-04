"use client";

import Link from "next/link";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { registerSchema } from "@/schemas";
import { FormInput } from "@/components";
import { login, setAuthError } from "@/store/slices/authSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      setSubmitting(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
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
          user: response.data.data,
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
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      password2: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <>
      <section className="section"></section>
      <section className="section-lg">
        <div className="container">
          <div className="w-8/12 mx-auto">
            <h3 className="heading mb-10">Create An Account</h3>
            <form onSubmit={handleSubmit}>
              <div className="gap-7 mb-7 grid grid-cols-2">
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
                  label="First name"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstName && touched.firstName}
                />
                <FormInput
                  label="Last name"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
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
                {isSubmitting ? "Submitting" : "Register"}
              </button>
              <p className="mt-5">
                Already have an account?{" "}
                <Link href="/login" className="text-primary">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
