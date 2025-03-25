/**
 * Authentication Thunks
 *
 * This module contains asynchronous actions (thunks) for handling user authentication
 * including registration and login functionality. These thunks handle API calls
 * and state updates through the auth slice.
 *
 * @module authThunks
 */

import { postRequest } from "../../utils/services";
import {
  setUser,
  setRegisterError,
  setLoginError,
  setRegisterLoading,
  setLoginLoading,
} from "../slices/authSlice";

/**
 * Registers a new user in the system
 *
 * @param {Object} registerInfo - User registration information
 * @param {string} registerInfo.name - User's name
 * @param {string} registerInfo.email - User's email
 * @param {string} registerInfo.password - User's password
 * @returns {Function} Thunk function that handles the registration process
 */
export const registerUser = (registerInfo) => async (dispatch) => {
  dispatch(setRegisterLoading(true));
  try {
    const response = await postRequest("users/register", registerInfo);
    if (response.error) {
      dispatch(setRegisterError(response));
      return;
    }
    localStorage.setItem("User", JSON.stringify(response));
    dispatch(setUser(response));
  } catch (error) {
    dispatch(setRegisterError(error));
  } finally {
    dispatch(setRegisterLoading(false));
  }
};

/**
 * Logs in an existing user
 *
 * @param {Object} loginInfo - User login information
 * @param {string} loginInfo.email - User's email
 * @param {string} loginInfo.password - User's password
 * @returns {Function} Thunk function that handles the login process
 */
export const loginUser = (loginInfo) => async (dispatch) => {
  dispatch(setLoginLoading(true));
  try {
    const response = await postRequest("users/login", loginInfo);
    if (response.error) {
      dispatch(setLoginError(response));
      return;
    }
    localStorage.setItem("User", JSON.stringify(response));
    dispatch(setUser(response));
  } catch (error) {
    dispatch(setLoginError(error));
  } finally {
    dispatch(setLoginLoading(false));
  }
};
