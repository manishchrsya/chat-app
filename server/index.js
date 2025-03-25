/**
 * Chat Application Server
 *
 * This is the main server file for the real-time chat application.
 * It sets up the Express server, connects to MongoDB, and configures routes
 * for user management, chat functionality, and messaging.
 *
 * @module server
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

const app = express();
require("dotenv").config();

/**
 * Middleware Configuration
 * - express.json(): Parses incoming JSON payloads
 * - cors(): Enables Cross-Origin Resource Sharing
 */
app.use(express.json());
app.use(cors());

/**
 * API Routes Configuration
 * - /api/users: User management (registration, login, profile)
 * - /api/chats: Chat management (create, get, update chats)
 * - /api/messages: Message management (send, receive messages)
 */
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

/**
 * Root endpoint - API welcome message
 */
app.get("/", (req, res) => {
  res.send("Welcome to our chat app API's");
});

/**
 * Server Initialization
 * - Connects to MongoDB Atlas
 * - Starts the Express server on configured port
 * - Handles connection errors
 */
(async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("✅ MongoDB Connected Successfully");
    const port = process.env.PORT || 8080;
    console.log("Mongo DB Connected");
    app.listen(port, (req, res) => {
      console.log(`server is running on port.. ${port}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the server if DB connection fails
  }
})();
