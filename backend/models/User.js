const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  currentStreak: {
    type: Number,
    default: 1
  },

  longestStreak: {
    type: Number,
    default: 1
  },

  lastLoginDate: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "User",
  userSchema
);