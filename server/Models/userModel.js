/**
 * User Model
 *
 * Mongoose schema and model for user data.
 * Defines the structure and validation rules for user documents in MongoDB.
 *
 * @module models/userModel
 */

const mongoose = require("mongoose");

/**
 * User Schema
 *
 * @typedef {Object} UserSchema
 * @property {string} name - User's display name (3-30 characters)
 * @property {string} email - User's unique email address (3-200 characters)
 * @property {string} password - Hashed password (3-1024 characters)
 * @property {Date} createdAt - Timestamp of user creation
 * @property {Date} updatedAt - Timestamp of last update
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * User Model
 * Mongoose model compiled from UserSchema
 *
 * @type {mongoose.Model}
 */
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
