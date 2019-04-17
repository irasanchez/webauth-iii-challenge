const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//import routers here
// const authRouter = require('../auth/auth-router.js');
// const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//use routers here
// server.use('/api/auth', authRouter);
// server.use('/api/users', usersRouter);

module.exports = server;
