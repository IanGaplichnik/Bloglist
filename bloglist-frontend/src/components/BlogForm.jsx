import { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { createBlogOnServer } from '../services/blogs'
import { NotificationContext } from './NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const BlogForm = ({ togglableRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { dispatchNotification } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const createBlogMutation = useMutation({
    mutationFn: createBlogOnServer,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    },
  })

  const resetFormHooks = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const createBlog = async (newBlog) => {
    createBlogMutation.mutate(newBlog)

    dispatchNotification({
      type: 'SET_SUCCESS',
      payload: `Blog ${newBlog.title} by ${newBlog.author} has been saved!`,
    })
    setTimeout(() => dispatchNotification({ type: 'RESET' }), 5000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      createBlog({ title, author, url })
      resetFormHooks()
      togglableRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:{' '}
        <input
          type='text'
          value={title}
          name='Title'
          placeholder='Enter title'
          id='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          type='text'
          value={author}
          name='Author'
          placeholder='Enter author'
          id='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          type='text'
          value={url}
          name='URL'
          placeholder='Enter URL'
          id='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit' id='create-button'>
        create
      </button>
    </form>
  )
}

export default BlogForm
