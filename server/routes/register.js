const router = require('express').Router()
const { User, validate } = require('../model/user')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) return res.status(400).send({ message: error.detail[0].message })

    const user = await User.findOne({ emnail: req.body.email })
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
