const mongoose = require("mongoose");

const History = mongoose.model(
  "History",
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

module.exports = History;
