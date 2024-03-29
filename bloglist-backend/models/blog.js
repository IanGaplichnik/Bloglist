const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: String,
  url: {
    type: String,
    require: true,
  },
  likes: Number,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: String,
    },
  ],
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
