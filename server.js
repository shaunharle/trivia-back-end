//Dependencies
const express = require("express");
const app = express();
const PORT = 3003;
const mongoose = require("mongoose");
const cors = require("cors");
const MONGODB_URI = "mongodb://localhost:27017/trivia";

const whitelist = ["http://localhost:3000"];
// const whitelist = ["*"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

//Middleware
app.use(express.json());
app.use(cors(corsOptions));

//Connection to database
mongoose.connection.on("error", err =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose");
});

mongoose.set("useFindAndModify", false);

// Controllers/Routes
const userController = require("./controllers/users_ph.js");
app.use("/trivia", userController);

const leaderController = require("./controllers/leaderboard.js");
app.use("/leaderboard", leaderController);

app.get("/", (req, res) => {
  res.send("hello");
});

//Listen
app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
