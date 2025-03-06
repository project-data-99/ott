import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    avatar: null,
    role: null,
    is_verified: false,
    watchList: [],
    preferences: [],
    likedVideos: [],
    lastLogin: "",
  },
  loading: false,
  error: null,
  token: null,
  tokenExpiration: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    login: (state, action) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.isAdmin || false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.tokenExpiration = action.payload.tokenExpiration;
      state.loading = false;
    },

    // Logout
    logout: () => initialState,

    // Set Auth Error
    setAuthError: (state, action) => {
      state.error = action.payload;
    },

    // Update Profile
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    // Set Loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setAuthError, setLoading, updateProfile } =
  authSlice.actions;

export default authSlice.reducer;
