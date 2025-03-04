"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

import { LoginForm } from "@/sections/authentication";

const LoginPage = () => {
  const auth = useSelector((state) => state.auth);
  if (auth.isAuthenticated) return redirect("/profile");

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
