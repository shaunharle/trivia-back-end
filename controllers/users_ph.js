const express = require("express");
const router = express.Router();
const User = require("../models/users_ph_bak");
// const passport = require("../server/passport");

router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password } = req.body;
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    } else {
      const newUser = new User({
        username: username,
        password: password
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post("/update", (req, res) => {
  console.log("user update", req.body);

  let scoreEntry = Object.values(req.body);
  console.log(Object.values(req.body));

  // ADD VALIDATION
  User.findOne({ username: req.body.user }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      console.log("user");
      // User.findByIdAndUpdate()
      const timestamp = Date.now();
      console.log(timestamp);

      User.findOneAndUpdate(
        {
          username: req.body.user,
          score: { $lt: req.body.score }
        },
        {
          $inc: { gamesplayedcount: 1 }, // Set to new set of values
          $set: { score: req.body.score }
        },
        { new: true },
        (err, updateduser) => {
          if (err) {
            console.log(err);
          } else {
            // console.log("else find update - level2  ");
            console.log("updateduser: ", updateduser);
            res.json({
              error: `Success updating ${user.username}`
            });
          }
        }
      );
    }
  });
});

///
// highscores: {
//     difficultylevel: { type: String },
//     score: { type: Number },
//     date: { type: Date, default: Date.now }
//   }

///
// username: { type: String, unique: false, required: false },
// password: { type: String, unique: false, required: false },
// gamesplayedcount: { type: Number, unique: false, required: false },
// highscores: {
//   difficultylevel: { type: String },
//   score: { type: Number },
//   date: { type: Date, default: Date.now }
// }

router.post(
  "/login",
  function(req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
    req.body.gamesplayedcount = 0;
    req.body.score = 0;

    User.create(req.body, (err, createdUser) => {
      console.log("created user ", createdUser);
      // res.redirect("/user");
    });
  }
  //   ,
  //   passport.authenticate("local"),
  //   (req, res) => {
  //     console.log("logged in", req.user);
  //     var userInfo = {
  //       username: req.user.username
  //     };
  //     res.send(userInfo);
  //   }
);

router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
