const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    comments: [
      {
        text: String,
        createdBy: {
          type: ObjectId,
          ref: 'User',
        },
      },
    ],
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

module.exports = { Post }
