"use client";

import { useSelector, useDispatch } from "react-redux";

import { Alert } from "@/components";
import { hideAlert } from "@/store/slices/alertSlice";

const Main = ({ children }) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  // Close Alert Handler
  const handleCloseAlert = () => {
    dispatch(hideAlert());
  };

  return (
    <>
      {alert.visible && (
        <Alert
          className={`alert-${alert.type}`}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}

      <main className="db-main">{children}</main>
    </>
  );
};

export default Main;
