require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

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
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

const PORT = process.env.PORT || 8000
const User = require('./model/user')
const Post = require('./model/pic')

// routes
app.use('/api/', authRoute)
app.use('/api/pic', picRoute)

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`)
})
