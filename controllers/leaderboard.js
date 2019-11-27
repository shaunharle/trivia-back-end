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

leaderboard.post("/update", (req, res) => {
  console.log("leaderboard update");

  let scoreEntry = Object.values(req.body);
  console.log(req.body);

  console.log(Object.values(req.body));

  // username: this.state.username,
  // score: this.state.scorePct,
  // prevleader: this.state.leadingUser
  //
  // date: { type: Date, default: Date.now },
  // username: { type: String, required: true },
  // highScore: { type: Number, required: true },
  // difficultyLevel: { type: String, required: true }

  // ADD VALIDATION
  Leaderboard.findOneAndUpdate(
    { username: req.body.prevleader },
    {
      $set: { highScore: req.body.score, username: req.body.username }
    },
    { new: true },

    (err, user) => {
      if (err) {
        console.log("User.js post error: ", err);
      } else if (user) {
        console.log("user");
        // User.findByIdAndUpdate()
        res.json({
          error: `Success updating ${req.body.username}`
        });
      }
    }
  );
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
