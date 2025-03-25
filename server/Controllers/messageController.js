/**
 * Message Controller
 *
 * Controller functions for handling message-related operations.
 * Includes creating and retrieving chat messages.
 *
 * @module controllers/messageController
 */

const messageModel = require("../Models/messageModel");

/**
 * Creates a new message in a chat
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.chatId - ID of the chat this message belongs to
 * @param {string} req.body.senderId - ID of the user sending the message
 * @param {string} req.body.text - Content of the message
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new messageModel({ chatId, senderId, text });

  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * Retrieves all messages for a specific chat
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.chatId - ID of the chat to get messages from
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages }; // export the functions to be used in other
