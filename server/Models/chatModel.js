/**
 * Chat Model
 *
 * Mongoose schema and model for chat conversations.
 * Defines the structure for chat documents in MongoDB.
 *
 * @module models/chatModel
 */

const mongoose = require("mongoose");

/**
 * Chat Schema
 *
 * @typedef {Object} ChatSchema
 * @property {Array<string>} members - Array of user IDs participating in the chat
 * @property {Date} createdAt - Timestamp of chat creation
 * @property {Date} updatedAt - Timestamp of last update
 */
const chatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
      description: "Array of user IDs participating in the chat",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Chat Model
 * Mongoose model compiled from ChatSchema
 *
 * @type {mongoose.Model}
 */
const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
