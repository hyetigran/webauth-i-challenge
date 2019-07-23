const express = require("express");
const bcrypt = require('bcryptjs');
const Users = require("../models/user-model");
const restricted = require('../auth/restricted-middleware')

const router = express.Router();

router.get("/users", restricted, (req, res) => {
  Users.find().then(users => {
    res.status(200).json(users);
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({ message: "Failed to get projects" });
  })
});

router.get("/logout", (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err) {
        res.send('Something went wront')
      } else {
        res.send('You are logged out')
      }
  })
}})

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12)
  user.password = hash
  
  Users
    .add(user)
    .then(saved => {
      console.log('happy path')
      res.status(201).json(saved);
  })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ message: "Failed to add user" });
  });
});

router.post("/login", (req, res) => {
  let {username, password } = req.body;
  //console.log(req.body)
  Users.findBy(username).first().then(user => {
    //console.log(user)
    if (user && bcrypt.compareSync(password, user.password)){
      //console.log('you are in the success')
      res.status(200).json({ message: "Welcome"})
    } else {
      //console.log('you are in the invalid')
      res.status(401).json({ message: 'Invalid Credentials'});
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

module.exports = router;