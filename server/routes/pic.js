const router = require('express').Router()
const requireLogin = require('../middleware/requireLogin')
const { Post } = require('../model/pic')
var cloudinary = require('cloudinary').v2
const upload = require('../utils/multer')

router.get('/', (req, res) => {
  Post.find()
    .populate('createdBy', '_id username')
    .populate('comments.createdBy', '_id username')
    .sort(`-createdAt`)
    .then((posts) => {
      res.json({ posts })
    })
    .catch((err) =>
      res.status(404).json({
        message: err,
      })
    )
})

router.get('/:postId', (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .then((post) => {
      res.json({ post })
    })
    .catch((err) =>
      res.status(404).json({
        message: err,
      })
    )
})

router.post('/', requireLogin, async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const { caption, imageBase64 } = req.body

  if (!imageBase64) {
    res.status(422).json({ message: 'Please upload your image' })
  }
  if (!caption) {
    res.status(422).json({ message: 'Please write your caption' })
  }

  const post = new Post({
    caption,
    photo: imageBase64,
    createdBy: req.user,
  })

  req.user.password = undefined
  post
    .save()
    .then((result) => {
      res.json({ post: result })
    })
    .catch((err) => {
      res.json(err)
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
            return res.status(204).json({ message: res })
          })
          .catch((err) => {
            return res.status(404).json({ message: err })
          })
      }
    })
})

module.exports = router
