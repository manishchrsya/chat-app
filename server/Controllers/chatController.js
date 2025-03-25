/**
 * Chat Controller
 *
 * Controller functions for handling chat-related operations.
 * Includes creating chats and finding chats for users.
 *
 * @module controllers/chatController
 */

const chatModel = require("../Models/chatModel");
// create chat
// get all chats
// find chat

/**
 * Creates a new chat between two users
 * If a chat already exists between these users, returns the existing chat
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.firstId - First user's ID
 * @param {string} req.body.secondId - Second user's ID
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    // Check if chat already exists
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) {
      return res.status(200).json(chat);
    }
    // Create new chat if none exists
    const newChat = await chatModel({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * Finds all chats that a user is a member of
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.userId - User's ID to find chats for
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const findUserChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * Finds a specific chat between two users
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.firstId - First user's ID
 * @param {string} req.params.secondId - Second user's ID
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chats = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { findUserChats, createChat, findChat };
