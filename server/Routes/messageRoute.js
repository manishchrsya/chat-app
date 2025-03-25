/**
 * Message Routes
 *
 * Express router for handling message-related API endpoints.
 * Includes routes for sending and retrieving chat messages.
 *
 * @module routes/messageRoute
 */

const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../Controllers/messageController");

const router = express.Router();

/**
 * Message API Routes:
 *
 * POST /api/messages - Create a new message in a chat
 * GET /api/messages/:chatId - Get all messages for a specific chat
 */

router.post("/", createMessage);
router.get("/:chatId", getMessages);

module.exports = router;
