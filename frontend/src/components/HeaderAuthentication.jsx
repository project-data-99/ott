"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { FiUser, FiUserPlus } from "react-icons/fi";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";

import { DummyUser } from "@/static/images";
import { logout } from "@/store/slices/authSlice";

const HeaderAuthentication = () => {
  const dispatch = useDispatch();
  const [dropdownActive, setDropdownActive] = useState(false);
  const auth = useSelector((state) => state.auth);

  const avatarUrl = auth?.user?.avatar
    ? `http://localhost:8000/${auth.user.avatar
        .replace(/\\/g, "/")
        .replace("public/", "")}`
    : DummyUser;

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
      setDropdownActive(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {/* Link */}
      <div className="relative">
        <button
          className="text-xl text-primary hover:text-light transition duration-500"
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          <FiUser />
        </button>

        {/* Dropdown */}
        {!auth.isAuthenticated && dropdownActive && (
          <div className="absolute right-0 w-64 max-w-2/3 bg-darkAlt p-4 top-9 rounded shadow-md">
            <ul className="flex gap-1">
              <li className="w-1/2">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 bg-dark text-light transition duration-500 hover:bg-primary hover:text-dark p-3 rounded-s-full"
                  onClick={() => setDropdownActive(false)}
                >
                  <CiLogin className="text-xl" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
              </li>
              <li className="w-1/2">
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 bg-dark text-light transition duration-500 hover:bg-primary hover:text-dark p-3 rounded-e-full"
                  onClick={() => setDropdownActive(false)}
                >
                  <FiUserPlus className="text-xl" />
                  <span className="text-sm font-medium">Register</span>
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Dropdown */}
        {auth.isAuthenticated && dropdownActive && (
          <div className="absolute right-0 w-64 max-w-2/3 bg-darkAlt p-4 top-9 rounded shadow-md">
            <p className="text-center mb-4">
              <Link
                href={`mailto:${auth.user.email}`}
                className="text-sm"
                onClick={() => setDropdownActive(false)}
              >
                {auth.user.email}
              </Link>
            </p>
            <div className="text-center mb-4">
              <Image
                src={avatarUrl}
                alt={auth.user.firstName}
                width="60"
                height="60"
                className="w-14 h-14 rounded-full overflow-hidden mx-auto"
              />
              <h6 className="text-primary text-sm font-semibold mt-4">
                Hi, {auth.user.firstName}!
              </h6>
            </div>
            <ul className="flex gap-1">
              <li className="w-1/2">
                <Link
                  href="/profile"
                  className="flex items-center justify-center gap-2 bg-dark text-light transition duration-500 hover:bg-primary hover:text-dark p-3 rounded-s-full"
                  onClick={() => setDropdownActive(false)}
                >
                  <FiUser className="text-xl" />
                  <span className="text-sm font-medium">Profile</span>
                </Link>
              </li>
              <li className="w-1/2">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-dark text-light transition duration-500 hover:bg-primary hover:text-dark p-3 rounded-e-full"
                >
                  <CiLogout className="text-xl" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderAuthentication;
