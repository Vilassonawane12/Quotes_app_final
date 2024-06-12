const mongoose = require("mongoose");

const Quote = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quotes: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    postAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", Quote);
