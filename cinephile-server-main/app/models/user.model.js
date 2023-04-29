const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: String,
      email: String,
      password: String,
      createdAt: Number,
      history: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "History",
        },
      ],
      watchlist: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "watchlist",
        },
      ],
    },
    {
      timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    }
  )
);

module.exports = User;
