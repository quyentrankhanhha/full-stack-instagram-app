const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY)
  return token
}

const User = mongoose.model('user', userSchema)

const validateRegister = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label('username'),
    email: Joi.string().email().required().label('email'),
    password: passwordComplexity().required().label('password'),
  })
  return schema.validate(data)
}

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('email'),
    password: passwordComplexity().required().label('password'),
  })
  return schema.validate(data)
}

module.exports = { User, validateRegister, validateLogin }
