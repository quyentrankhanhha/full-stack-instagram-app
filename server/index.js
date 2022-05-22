require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

// routes
const authRoute = require('./routes/auth')
const picRoute = require('./routes/pic')

// database connection
require('./database/mongoose')

// middlewares
app.use(express.json())
app.use(cors(corsOptions))

const PORT = process.env.PORT || 8000
const User = require('./model/user')
const Post = require('./model/pic')

// routes
app.use('/api/', authRoute)
app.use('/api/pic', picRoute)

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`)
})
