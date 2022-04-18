const router = require('express').Router()
const { User, validateLogin, validateRegister } = require('../model/user')
const bcrypt = require('bcrypt')
const requireLogin = require('../middleware/requireLogin')

router.get('/protected', requireLogin, (req, res) => {
  res.send('helo')
})

router.post('/login', async (req, res) => {
  try {
    const { error } = validateLogin(req.body)

    if (error)
      return res.status(400).send({ message: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })
    if (!user)
      return res.status(401).send({ message: 'Invalid Email or Password' })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword)
      return res.status(401).send({ message: 'Invalid Email or Password' })

    const token = user.generateAuthToken()
    const { _id, name, email, pic } = user
    res.status(200).send({
      token: token,
      user: { _id, name, email, pic },
      message: 'Logged in successfully!',
    })
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

router.post('/register', async (req, res) => {
  try {
    const { error } = validateRegister(req.body)

    if (error)
      return res.status(400).send({ message: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })

    if (user)
      return res
        .status(409)
        .send({ message: 'User with given email already exit' })

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    await new User({ ...req.body, password: hashPassword }).save()
    res.status(201).send({ message: 'User created succesfully' })
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

module.exports = router
