const mongoose = require("mongoose");

const leaderboardSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  username: { type: String, required: true },
  highScore: { type: Number, required: true },
  difficultyLevel: { type: String, required: true }
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
