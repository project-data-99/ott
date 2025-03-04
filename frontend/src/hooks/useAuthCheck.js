"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import {
  login,
  logout,
  setAuthError,
  setLoading,
} from "@/store/slices/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));

      // Get tokens
      const storedToken = localStorage.getItem("authToken");

      if (!storedToken) return false;

      try {
        // Fetch user profile
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/get-user-profile`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // Update Redux store
        dispatch(
          login({
            error: null,
            user: response.data.data.user,
            isAdmin: response.data.data.isAdmin,
            isAuthenticated: true,
            token: storedToken,
            tokenExpiration: null,
          })
        );
      } catch (error) {
        console.error("Auth Check Failed:", error);

        // Handle error (token expired, invalid, etc.)
        dispatch(logout());
        dispatch(setAuthError("Session expired. Please log in again."));
        localStorage.removeItem("authToken");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);
};

export default useAuthCheck;
