"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/store/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
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
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="border-b border-solid border-darkAlt py-4">
      <div className="container">
        <div className="flex items-center justify-between gap-10">
          <h4>Welcome {user.firstName}</h4>

          <button
            className="button button-sm button-primary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
