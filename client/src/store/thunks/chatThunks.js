/**
 * Chat Management Thunks
 *
 * This module contains asynchronous actions (thunks) for handling chat-related
 * operations including fetching chats, messages, and creating new chats.
 * These thunks handle API calls and state updates through the chat slice.
 *
 * @module chatThunks
 */

import { getRequest, postRequest } from "../../utils/services";
import {
  setUserChats,
  setPotentialChats,
  setMessages,
  setUserChatsLoading,
  setMessagesLoading,
  setUserChatsError,
  setMessagesError,
  addNewChat,
  setSendTextMessageError,
  addMessage,
  setNewMessage
} from "../slices/chatSlice";

/**
 * Fetches potential chat partners for the current user
 * Filters out users that the current user already has chats with
 *
 * @param {Array} userChats - Current user's existing chats
 * @param {string} userId - Current user's ID
 * @returns {Function} Thunk function that handles fetching potential chats
 */
export const fetchPotentialChats = (userChats, userId) => async (dispatch) => {
  try {
    const response = await getRequest("users");
    if (response.error) {
      console.log("Error fetching users", response);
      return;
    }

    const pChats = response?.filter((currentUser) => {
      let isChatCreated = false;
      if (userId === currentUser?._id) return false;

      if (userChats) {
        isChatCreated = userChats.some((chat) => {
          return (
            chat.members[0] === currentUser?._id ||
            chat.members[1] === currentUser._id
          );
        });
      }

      return !isChatCreated;
    });
    dispatch(setPotentialChats(pChats));
  } catch (error) {
    console.error("Error fetching potential chats:", error);
  }
};

/**
 * Fetches all chats for a specific user
 *
 * @param {string} userId - ID of the user whose chats to fetch
 * @returns {Function} Thunk function that handles fetching user chats
 */
export const fetchUserChats = (userId) => async (dispatch) => {
  if (!userId) return;

  dispatch(setUserChatsLoading(true));
  dispatch(setUserChatsError(null));

  try {
    const response = await getRequest(`chats/${userId}`);
    if (response.error) {
      dispatch(setUserChatsError(response));
      return;
    }
    dispatch(setUserChats(response));
  } catch (error) {
    dispatch(setUserChatsError(error));
  } finally {
    dispatch(setUserChatsLoading(false));
  }
};

/**
 * Fetches all messages for a specific chat
 *
 * @param {string} chatId - ID of the chat whose messages to fetch
 * @returns {Function} Thunk function that handles fetching chat messages
 */
export const fetchMessages = (chatId) => async (dispatch) => {
  if (!chatId) return;

  dispatch(setMessagesLoading(true));
  dispatch(setMessagesError(null));

  try {
    const response = await getRequest(`messages/${chatId}`);
    if (response.error) {
      dispatch(setMessagesError(response));
      return;
    }
    dispatch(setMessages(response));
  } catch (error) {
    dispatch(setMessagesError(error));
  } finally {
    dispatch(setMessagesLoading(false));
  }
};

/**
 * Creates a new chat between two users
 *
 * @param {string} firstId - ID of the first user
 * @param {string} secondId - ID of the second user
 * @returns {Function} Thunk function that handles creating a new chat
 */
export const createNewChat = (firstId, secondId) => async (dispatch) => {
  try {
    const response = await postRequest(`chats`, { firstId, secondId });
    if (response.error) {
      console.log("Error Creating chat", response);
      return;
    }
    dispatch(addNewChat(response));
  } catch (error) {
    console.error("Error creating chat:", error);
  }
};

export const sendTextMessage = (textMessage, sender, currentChatId, setTextMessage) => async (dispatch) => {
  if (!textMessage) {
    return;
  }
  try {
    const payload = {
      chatId: currentChatId,
      senderId: sender?._id,
      text: textMessage
    };
    const response = await postRequest("messages", payload);
    if (response.error) {
      dispatch(setSendTextMessageError(response));
      return console.log("Error sending message", response);
    }
    dispatch(setNewMessage(response));
    dispatch(addMessage(response));
    setTextMessage("");
  } catch (error) {
    console.error("Error sending message", error);
  }
};
