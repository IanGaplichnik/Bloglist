const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    if (
      !Object.hasOwn(request.body, 'title') ||
      !Object.hasOwn(request.body, 'url') ||
      request.body.title.length === 0 ||
      request.body.url.length === 0
    )
      return response.status(400).json({ error: 'title and url are required' })

    const user = request.user
    const blogRequest = {
      likes: request.body.likes ? request.body.likes : 0,
      user: user,
      ...request.body,
    }
    const blog = new Blog(blogRequest)
    try {
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
      response.status(201).json(result)
    } catch (exception) {
      next(exception)
    }
  }
)

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const user = request.user
    const id = request.params.id
    try {
      const blog = await Blog.findById(id)
      if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
      }
      if (blog.user.toString() === user.id.toString()) {
        console.log(user)
        user.blogs = user.blogs.filter((blog) => blog.toString() !== id)
        await blog.deleteOne()
        await user.save()
        return response.status(200).end()
      } else {
        return response
          .status(401)
          .json({ error: 'you are not authorized to delete this blog' })
      }
    } catch (exception) {
      next(exception)
    }
  }
)

blogsRouter.put(
  '/:id',
  //   middleware.userExtractor,
  async (request, response, next) => {
    const id = request.params.id

    if (
      !Object.hasOwn(request.body, 'title') ||
      !Object.hasOwn(request.body, 'url') ||
      request.body.title.length === 0 ||
      request.body.url.length === 0
    )
      return response.status(400).end()

    const blogUpdate = {
      likes: request.body.likes ? request.body.likes : 0,
      ...request.body,
    }

    try {
      const updatedResult = await Blog.findByIdAndUpdate(id, blogUpdate, {
        new: true,
        runValidators: true,
        context: 'query',
      }).populate('user', { name: 1, username: 1 })
      return response.json(updatedResult)
    } catch (exception) {
      next(exception)
    }
  }
)

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const id = request.params.id
  console.log('id = ', id)
  const updateBlog = request.body
  try {
    const blogToGetComment = await Blog.findByIdAndUpdate(id, updateBlog, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    return response.json(blogToGetComment)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter
