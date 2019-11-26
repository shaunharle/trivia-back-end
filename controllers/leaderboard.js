const express = require("express");
const leaderboard = express.Router();
const Leaderboard = require("../models/leaderboard.js");

// leaderboard.post("/", async (req, res) => {
//   Leaderboard.create(req.body, (error, createdLeaderboard) => {
//     if (error) {
//       res.status(400).json({ error: error.message });
//     }
//     res.status(200).send(createdLeaderboard);
//   });
// });

leaderboard.get("/", (req, res) => {
  Leaderboard.find({}, (err, foundLeaderboard) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundLeaderboard);
  });
});

// leaderboard.delete("/:id", (req, res) => {
//   Leaderboard.findByIdAndRemove(req.params.id, (err, deletedLeaderboard) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     }
//     res.status(200).json(deletedLeaderboard);
//   });
// });

// leaderboard.put("/:id", (req, res) => {
//   Leaderboard.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err, updatedLeaderboard) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//       }
//       res.status(200).json(updatedLeaderboard);
//     }
//   );
// });

module.exports = leaderboard;
