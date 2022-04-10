require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// routes
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')

// database connection
require('./database/mongoose')

// middlewares
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000
const User = require('./model/user')

// routes
app.use('/register', registerRoute)
app.use('/login', loginRoute)

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`)
})
