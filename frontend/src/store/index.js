import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "./slices/alertSlice";
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    modal: modalReducer,
  },
});

export default store;
