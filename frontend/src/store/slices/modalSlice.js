import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Show Modal
    showModal: (state) => {
      state.visible = true;
    },

    // Hide Modal
    hideModal: (state) => {
      state.visible = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
