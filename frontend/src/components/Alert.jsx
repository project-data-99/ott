"use client";

import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { hideAlert } from "../store/slices/alertSlice";

const Alert = () => {
  const dispatch = useDispatch();
  const { message, type, visible } = useSelector((state) => state.alert);

  const alertColors = (alertType) => {
    switch (alertType) {
      case "success":
        return "border-primary";
      case "error":
        return "border-b-red-500";
      case "info":
        return "border-b-blue-500";
      default:
        return "border-b-gray-500";
    }
  };

  const handleCloseAlert = () => {
    dispatch(hideAlert());
  };

  useEffect(() => {
    let timeoutId;
    if (visible) {
      timeoutId = setTimeout(() => {
        dispatch(hideAlert());
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div
      className={`fixed left-7 bottom-7 bg-light rounded px-4 py-3 flex border-b-[5px] border-solid border-b-5 w-[80%] max-w-[300px] z-50 ${alertColors(
        type
      )}`}
    >
      <p className="text-dark text-sm font-medium">{message}</p>
      <button className="absolute top-1 right-1" onClick={handleCloseAlert}>
        <IoMdClose />
      </button>
    </div>
  );
};

export default Alert;
