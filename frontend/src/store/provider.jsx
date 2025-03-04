"use client"; // This must be a Client Component

import { Provider } from "react-redux";

import store from "@/store";

const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
