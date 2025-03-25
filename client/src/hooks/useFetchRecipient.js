/**
 * Custom Hook: Fetch Recipient User
 *
 * A custom React hook that fetches and manages the recipient user's data in a chat.
 * It handles the API call to get user details and manages loading/error states.
 *
 * @module hooks/useFetchRecipient
 */

import { useEffect, useState } from "react";
import { getRequest } from "../utils/services";

/**
 * useFetchRecipientUser Hook
 *
 * Fetches the recipient user's data for a given chat by:
 * 1. Finding the recipient's ID from chat members
 * 2. Making an API call to fetch user details
 * 3. Managing the response state
 *
 * @param {Object} chat - The chat object containing members array
 * @param {Object} user - The current user object
 * @returns {Object} An object containing:
 *   - recipientUser: The fetched recipient user data
 *   - error: Any error that occurred during fetching
 */
export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  // Find the ID of the other user in the chat
  const recipientId = chat?.members.find((id) => id !== user?._id);
  // console.log("recipientId", recipientId, chat);

  /**
   * Fetches recipient user data when:
   * - Chat changes
   * - Recipient ID is available
   */
  useEffect(() => {
    if (recipientId) {
      (async () => {
        if (!recipientId) return null;
        const response = await getRequest(`users/find/${recipientId}`);
        if (response.error) {
          return setError(response.error);
        }
        setRecipientUser(response);
      })();
    }
  }, [recipientId]);

  return { recipientUser, error };
};
