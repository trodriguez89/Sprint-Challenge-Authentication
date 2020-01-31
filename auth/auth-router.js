const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

const { jwtSecret } = require("../config/secrets");

// endpoints with /api/auth
router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
  .then(saved => {
    const token = signToken(saved)
    const payload = {...saved, token: token}
    res.status(201).json(payload)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "Error registering new user."})
  })
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password } = req.body;
  Users.findBy({ username })
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = signToken(user)
      res.status(200).json({message: `Welcome back ${user.username}`, token })
    } else {
      res.status(401).json({message: "Invalid Credentials."})
    }
  })
});

function signToken(user){
  const payload = {
    id: user.id,
    username: user.username
  };
  const options = {

  };
  return jwt.sign(payload, jwtSecret, options)
};

module.exports = router;
