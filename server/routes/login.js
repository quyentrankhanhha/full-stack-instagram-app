const router = require('express').Router()
const { User } = require('../model/user')
const Joi = require('joi')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (errpr)
      return res.status(400).send({ message: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })
    if (!user)
      return res.status(401).send({ message: 'Invalid Email or Password' })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword)
      return res.status(401).send({ message: 'Invalid Email or Password' })

    const token = user.generateAuthToken()
    res.status(200).send({ data: token, message: 'Logged in successfully!' })
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('email'),
    password: passwordComplexity().required().label('password'),
  })
  return schema.validate(data)
}

module.exports = router
