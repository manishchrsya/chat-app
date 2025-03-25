/**
 * Chat Management Slice
 *
 * This slice manages the chat-related state of the application including:
 * - User's chat list
 * - Potential chat partners
 * - Current active chat
 * - Messages
 * - Loading and error states
 *
 * @module chatSlice
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the chat slice
 * @type {Object}
 */
const initialState = {
  userChats: null,
  isUserChatsLoading: false,
  userChatsError: null,
  potentialChats: [],
  currentChat: null,
  messages: null,
  isMessagesLoading: false,
  messagesError: null,
  sendTextMessageError: null,
  socket: null,
  onlineUsers: [],
  newMessage: null,
};

/**
 * Chat slice with reducers for managing chat state
 */
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    /**
     * Sets the user's chat list
     * @param {Object} state - Current state
     * @param {Array} action - Action containing chat list
     */
    setUserChats: (state, action) => {
      state.userChats = action.payload;
    },
    /**
     * Sets the list of potential chat partners
     * @param {Object} state - Current state
     * @param {Array} action - Action containing potential chats
     */
    setPotentialChats: (state, action) => {
      state.potentialChats = action.payload;
    },
    /**
     * Sets the currently active chat
     * @param {Object} state - Current state
     * @param {Object} action - Action containing current chat
     */
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    /**
     * Sets the messages for the current chat
     * @param {Object} state - Current state
     * @param {Array} action - Action containing messages
     */
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    /**
     * Sets loading state for user chats
     * @param {Object} state - Current state
     * @param {boolean} action - Action containing loading state
     */
    setUserChatsLoading: (state, action) => {
      state.isUserChatsLoading = action.payload;
    },
    /**
     * Sets loading state for messages
     * @param {Object} state - Current state
     * @param {boolean} action - Action containing loading state
     */
    setMessagesLoading: (state, action) => {
      state.isMessagesLoading = action.payload;
    },
    /**
     * Sets error state for user chats
     * @param {Object} state - Current state
     * @param {Object} action - Action containing error message
     */
    setUserChatsError: (state, action) => {
      state.userChatsError = action.payload;
    },
    /**
     * Sets error state for messages
     * @param {Object} state - Current state
     * @param {Object} action - Action containing error message
     */
    setMessagesError: (state, action) => {
      state.messagesError = action.payload;
    },
    /**
     * Adds a new chat to the user's chat list
     * @param {Object} state - Current state
     * @param {Object} action - Action containing new chat
     */
    addNewChat: (state, action) => {
      state.userChats = [...state.userChats, action.payload];
    },
    setSendTextMessageError: (state, action) => {
      state.sendTextMessageError = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
    }
  },
});

// Export actions
export const {
  setUserChats,
  setPotentialChats,
  setCurrentChat,
  setMessages,
  setUserChatsLoading,
  setMessagesLoading,
  setUserChatsError,
  setMessagesError,
  addNewChat,
  setNewMessage,
  setSendTextMessageError,
  addMessage,
  setSocket,
  setOnlineUsers,
} = chatSlice.actions;

export default chatSlice.reducer;
