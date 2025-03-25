/**
 * Authentication Slice
 *
 * This slice manages the authentication state of the application including:
 * - User information
 * - Registration and login form states
 * - Loading states
 * - Error states
 *
 * @module authSlice
 */

import { createSlice } from "@reduxjs/toolkit";

// Initialize user from localStorage if available
const user = JSON.parse(localStorage.getItem("User"));

/**
 * Initial state for the auth slice
 * @type {Object}
 */
const initialState = {
  user: user || null,
  registerError: null,
  isRegisterLoading: false,
  loginError: null,
  isLoginLoading: false,
  registerInfo: {
    name: "",
    email: "",
    password: "",
  },
  loginInfo: {
    email: "",
    password: "",
  },
};

/**
 * Authentication slice with reducers for managing auth state
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets the current user in the state
     * @param {Object} state - Current state
     * @param {Object} action - Action containing user data
     */
    setUser: (state, action) => {
      state.user = action.payload;
    },
    /**
     * Updates the registration form information
     * @param {Object} state - Current state
     * @param {Object} action - Action containing form data
     */
    updateRegisterInfo: (state, action) => {
      state.registerInfo = action.payload;
    },
    /**
     * Updates the login form information
     * @param {Object} state - Current state
     * @param {Object} action - Action containing form data
     */
    updateLoginInfo: (state, action) => {
      state.loginInfo = action.payload;
    },
    /**
     * Sets registration error message
     * @param {Object} state - Current state
     * @param {Object} action - Action containing error message
     */
    setRegisterError: (state, action) => {
      state.registerError = action.payload;
    },
    /**
     * Sets login error message
     * @param {Object} state - Current state
     * @param {Object} action - Action containing error message
     */
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    /**
     * Sets registration loading state
     * @param {Object} state - Current state
     * @param {Object} action - Action containing loading state
     */
    setRegisterLoading: (state, action) => {
      state.isRegisterLoading = action.payload;
    },
    /**
     * Sets login loading state
     * @param {Object} state - Current state
     * @param {Object} action - Action containing loading state
     */
    setLoginLoading: (state, action) => {
      state.isLoginLoading = action.payload;
    },
    /**
     * Logs out the user by clearing all auth state
     * @param {Object} state - Current state
     */
    logoutUser: (state) => {
      state.user = null;
      state.registerError = null;
      state.loginError = null;
      state.registerInfo = {
        name: "",
        email: "",
        password: "",
      };
      state.loginInfo = {
        email: "",
        password: "",
      };
    },
  },
});

// Export actions
export const {
  setUser,
  updateRegisterInfo,
  updateLoginInfo,
  setRegisterError,
  setLoginError,
  setRegisterLoading,
  setLoginLoading,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
