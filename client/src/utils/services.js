/**
 * API Service Utilities
 *
 * A collection of utility functions for making HTTP requests to the backend API.
 * Includes standardized error handling and response formatting.
 *
 * @module utils/services
 */

/** Base URL for all API requests */
export const baseUrl = "http//localhost:8080/api";

/**
 * Makes a POST request to the API
 *
 * @param {string} url - The API endpoint path (without base URL)
 * @param {Object} body - The request body to be sent as JSON
 * @returns {Promise<Object>} The parsed response data or error object
 *   - On success: The response data
 *   - On error: { error: true, message: string }
 */
export const postRequest = async (url, body) => {
  const payload = JSON.stringify(body);
  const response = await fetch(`http://localhost:8080/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  const data = await response.json();
  if (!response.ok) {
    const message = data?.message ?? data;
    return { error: true, message };
  }
  return data;
};

/**
 * Makes a GET request to the API
 *
 * @param {string} url - The API endpoint path (without base URL)
 * @returns {Promise<Object>} The parsed response data or error object
 *   - On success: The response data
 *   - On error: { error: true, message: string }
 */
export const getRequest = async (url) => {
  const response = await fetch(`http://localhost:8080/api/${url}`);
  const data = await response.json();
  if (!response.ok) {
    const message = data?.message ?? "An error occured...";
    return { error: true, message };
  }
  return data;
};
