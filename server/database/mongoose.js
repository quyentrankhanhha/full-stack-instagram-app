const mongoose = require('mongoose')

mongoose
  .connect(
    process.env.DATABASE,
    {
      useNewURLParser: true,
      useUnifiedTopology: true,
    },
    6000000
  )

  .then(console.log('connected to server'))
  .catch((err) => console.log(err))
