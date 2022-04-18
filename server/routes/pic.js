const router = require('express').Router()
const requireLogin = require('../middleware/requireLogin')
const { Post } = require('../model/pic')
var cloudinary = require('cloudinary').v2
const upload = require('../utils/multer')

exports.uploads = (file) => {
  return new Promise((res) => {
    cloudinary.uploader.upload(
      file,
      (res) => {
        resolve({ url: res.url, id: res.public_id })
      },
      {
        resource_type: 'auto',
      }
    )
  })
}

router.get('/', (req, res) => {
  Post.find()
    .populate('createdBy', '_id name')
    .populate('comments.createdBy', '_id name')
    .sort(`-createdAt`)
    .then((posts) => {
      res.json({ posts })
    })
    .catch((err) => console.log(err))
})

router.get('/:postId', (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .then((post) => {
      res.json({ post })
    })
    .catch((err) => console.log(err))
})

router.post('/', upload.single('photo'), requireLogin, (req, res) => {
  const img = cloudinary.uploader.upload(req.file.path)

  const { caption } = req.body
  if (!caption) {
    res.status(422).json({ message: 'Please fill all the fields' })
  }
  const post = new Post({
    caption,
    photo: img,
    createdBy: req.user,
  })

  req.user.password = undefined
  post
    .save()
    .then((result) => {
      res.json({ post: result })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.put('/', (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $set: { caption: req.body.caption } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ message: `${err}` })
    } else res.json(result)
  })
})

router.put('/comment', requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    createdBy: req.user._id,
  }
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate('comments.createdBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ message: `${err}` })
      } else return res.status(200).json(result)
    })
})

router.delete('/', requireLogin, (req, res) => {
  Post.findOne({ _id: req.body.postId })
    .populate('createdBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ message: `${err}` })
      }

      if (post.createdBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((res) => {
            return res.json({ message: `${err}` })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
})

module.exports = router
