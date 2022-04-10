const router = require('express').Router()
const { User, validateLogin } = require('../model/user')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  try {
    const { error } = validateLogin(req.body)
    console.log(error)
    if (error)
      return res.status(400).send({ message: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword || !user)
      return res.status(401).send({ message: 'Invalid Email or Password' })

    const token = user.generateAuthToken()
    res.status(200).send({ data: token, message: 'Logged in successfully!' })
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

module.exports = router
