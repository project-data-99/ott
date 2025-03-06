"use client";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

const layout = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isAuthenticated) return redirect("/login");

  return <>{children}</>;
};

export default layout;
