const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

// GET /api/users
//If the user is logged in => add restricted middleware
// Use this endpoint to verify that the password is hashed before it is saved.
router.get("/", restricted, (req, res) => {
  // respond with an array of all the users contained in the database.
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.send(error));
});
