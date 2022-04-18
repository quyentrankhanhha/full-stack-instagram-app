const jwt = require('jsonwebtoken')
const { User } = require('../model/user')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).json({ message: 'You have to login' })
  }
  const token = authorization.replace('Bearer ', '')
  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'You have to login' })
    }
    const { _id } = payload
    return User.findById(_id).then((userData) => {
      req.user = userData
      next()
    })
  })
}
