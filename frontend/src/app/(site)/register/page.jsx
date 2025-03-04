"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

import { RegisterForm } from "@/sections/authentication";

const RegisterPage = () => {
  const auth = useSelector((state) => state.auth);
  if (auth.isAuthenticated) return redirect("/profile");

  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
