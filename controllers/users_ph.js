const express = require("express");
const router = express.Router();
const User = require("../models/users_ph_bak");
const bcrypt = require("bcrypt");

router.post("/update", (req, res) => {
  console.log("user update", req.body);

  let scoreEntry = Object.values(req.body);
  console.log(Object.values(req.body));

  User.findOneAndUpdate(
    {
      username: req.body.username,
      score: { $lt: req.body.score }
    },
    {
      $inc: { gamesplayedcount: 1 }, // Set to new set of values
      $set: { score: req.body.score }
    },
    { new: true },
    (err, updateduser) => {
      console.log("after update  ", req.body.username);
      if (err) {
        console.log(err);
      } else {
        if (updateduser) {
          // console.log("else find update - level2  ");
          console.log("updateduser: ", updateduser);
          res.json({
            error: `Success updating ${updateduser.username}`
          });
        }
      }
    }
  );
});

router.post("/login", function(req, res, next) {
  console.log("routes/user.js, login, req.body: ");
  console.log(req.body);
  //   req.body.password = bcrypt.hashSync(
  //     req.body.password,
  //     bcrypt.genSaltSync(10)
  //   );
  req.body.gamesplayedcount = 0;
  req.body.score = 0;

  ////
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    console.log("in /login post", req.body.username);

    if (foundUser) {
      console.log("in user found");
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        console.log("in password matched");
        // req.session.currentUser = foundUser;
        res.json({ success: true, error: false });
      } else {
        console.log("password wrong");
        res.json({ success: false, error: true });
      }
    } else {
      console.log("no user found");
      res.json({ success: false, error: true });
      // res.redirect("/");
      // res.send('<a href="/">Wrong user or password go back</a>');
    }
  });

  //////
});

///

router.post("/signup", function(req, res, next) {
  console.log("In signup ");
  console.log(req.body);
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  req.body.gamesplayedcount = 0;
  req.body.score = 0;

  User.findOne({ username: req.body.username }, (err, foundUser) => {
    console.log("in /sessions post");
    if (foundUser) {
      console.log("user already exists");
      res.json({ userexists: true, error: true });
    } else {
      User.create(
        req.body,
        (err, createdUser) => {
          console.log("created user ", createdUser);
          res.json({ userexists: false, error: false });
        }
        // res.redirect("/user");
      );
    }
  });
});

router.get("/", (req, res, next) => {
  console.log("===== user trivia!!======");
});

module.exports = router;
