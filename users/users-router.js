const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/authenticate-middleware");

router.get("/", restricted, (req, res) => {
    Users.getAll()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "Error retrieving users"})
    })
});

module.exports = router;