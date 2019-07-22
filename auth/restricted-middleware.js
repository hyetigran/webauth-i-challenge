const bcrypt = require('bcryptjs')
const Users = require('../models/user-model')

module.exports = function restricted (req, res, next) {
  const {username, password} = req.headers

  if (username && password ) {
      //console.log(req.body)
      Users.findBy(username).first().then(user => {
        //console.log(user)
        if (user && bcrypt.compareSync(password, user.password)){
          //console.log('you are in the success')
          next()
        } else {
          //console.log('you are in the invalid')
          res.status(401).json({ message: 'Invalid Credentials'});
        }
      })
      .catch(error => {
        res.status(500).json(error)
      })
  } else {
    res.status(401).json( {message: "Please provide valid credentials"})
  }
}