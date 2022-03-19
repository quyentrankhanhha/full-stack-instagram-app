require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

// database connection
require('./database/mongoose')

// middlewares
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000
const User = require('./model/user')

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
