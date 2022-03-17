const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
require('dotenv').config()
require('./database/mongoose')

app.use(express.json())

const PORT = process.env.PORT || 8000
const User = require('./model/user')

// const user = new User({
//   username: 'hahahihi',
//   email: 'quyentrankhanhha@gmail.com',
//   password: '123456',
// })

app.post('/user/register', async (req, res) => {
  try {
    console.log('req.body: ', req.body)
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    await User.create(user)
    res.send('custer added')
  } catch (err) {
    console.log('err:', err)
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`)
})
