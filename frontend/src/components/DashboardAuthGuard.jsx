"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const DashboardAuthGuard = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.isAdmin) {
      if (pathname !== "/dashboard/login") {
        router.replace("/dashboard/login");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [auth, router, pathname]);

  if (loading) return null;

  return <>{children}</>;
};

export default DashboardAuthGuard;
