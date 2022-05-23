const path = require('path')
const multer = require('multer')

// multer config
module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      // let ext = path.extname(file.originalname)
      cb(null, file.originalname)
    },
  }),
})
