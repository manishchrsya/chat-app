/**
 * User Routes
 *
 * Express router for handling user-related API endpoints.
 * Includes routes for authentication, user lookup, and user listing.
 *
 * @module routes/userRoute
 */

const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} = require("../Controllers/userController");

const router = express.Router();

/**
 * User API Routes:
 *
 * POST /api/users/register - Register a new user
 * POST /api/users/login - Authenticate and login a user
 * GET /api/users/find/:userId - Find a specific user by ID
 * GET /api/users - Get all users
 */

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);

module.exports = router;
