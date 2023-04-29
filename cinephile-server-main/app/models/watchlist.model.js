const mongoose = require("mongoose");

const Watchlist = mongoose.model(
  "Watchlist",
  new mongoose.Schema(
    {
      uid: String,
      createdAt: Number,
      media: Object,
    },
    {
      timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    }
  )
);

module.exports = Watchlist;
