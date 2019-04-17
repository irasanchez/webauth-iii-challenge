const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model.js");

// POST /api/register
router.post("/register", (req, res) => {
  // Creates a `user` using the information sent inside the `body` of the request.
  let user = req.body;
  //**Hash the password**
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  //before saving the user to the database.
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => res.status(500).json(error));
});

//Function to make JWTs
function makeTokenFromUser() {
  const payload = {
    // create a JWT with the user id as the subject
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "15m"
  };
  const token = jwt.sign(payload, "this is the secret", options);
  return token;
}

// POST /api/login

router.post("/login", (req, res) => {
  // Use the credentials sent inside the `body` to authenticate the user.
  let { username, password } = req.body;
  // On successful login,
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        //create a new JWT
        const token = makeTokenFromUser(user);
        res.status(200).json({
          //and send it back to the client.
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        // If login fails, respond with the correct status code and the message: 'You shall not pass!'
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
