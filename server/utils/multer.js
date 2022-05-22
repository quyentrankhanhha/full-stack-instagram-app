const path = require('path')
const multer = require('multer')

// multer config
module.exports = multer({
  storage: './uploads',
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
      cb(new Error('Unsupported file type!'), false)
      return
    }
    cb(null, true)
  },
})
