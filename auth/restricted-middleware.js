module.exports = function restricted (req, res, next) {
  if (req.session && req.session.user ) {
      // //console.log(req.body)
      // Users.findBy(username).first().then(user => {
      //   //console.log(user)
      //   if (user && bcrypt.compareSync(password, user.password)){
      //     //console.log('you are in the success')
      //     next()
      //   } else {
      //     //console.log('you are in the invalid')
      //     res.status(401).json({ message: 'Invalid Credentials'});
      //   }
      // })
      // .catch(error => {
      //   res.status(500).json(error)
      // })
      next()
  } else {
    res.status(401).json( {message: "Please provide valid credentials"})
  }
}