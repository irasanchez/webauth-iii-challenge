//middleware imports
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//router imports
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

//server is made
const server = express();

//middleware and server used
server.use(express.json());
server.use(helmet());
server.use(cors());

//routers used
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

//test
server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
