/**
 * Chat Routes
 *
 * Express router for handling chat-related API endpoints.
 * Includes routes for creating, finding, and managing chat conversations.
 *
 * @module routes/chatRoute
 */

const express = require("express");
const {
  findUserChats,
  createChat,
  findChat,
} = require("../Controllers/chatController");

const router = express.Router();

/**
 * Chat API Routes:
 *
 * POST /api/chats - Create a new chat between two users
 * GET /api/chats/:userId - Get all chats for a specific user
 * GET /api/chats/find/:firstId/:secondId - Find a chat between two specific users
 */

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
