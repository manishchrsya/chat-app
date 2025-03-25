/**
 * Message Model
 *
 * Mongoose schema and model for chat messages.
 * Defines the structure and validation rules for message documents in MongoDB.
 *
 * @module models/messageModel
 */

const mongoose = require("mongoose");

/**
 * Message Schema
 *
 * @typedef {Object} MessageSchema
 * @property {string} chatId - ID of the chat this message belongs to
 * @property {string} senderId - ID of the user who sent the message
 * @property {string} text - Content of the message
 * @property {Date} createdAt - Timestamp of message creation
 * @property {Date} updatedAt - Timestamp of last update
 */
const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
      description: "Reference to the chat this message belongs to",
    },
    senderId: {
      type: String,
      required: true,
      description: "Reference to the user who sent this message",
    },
    text: {
      type: String,
      required: true,
      description: "Content of the message",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Message Model
 * Mongoose model compiled from MessageSchema
 *
 * @type {mongoose.Model}
 */
const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
