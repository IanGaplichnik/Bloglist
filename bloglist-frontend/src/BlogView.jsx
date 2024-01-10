import { useQueryClient, useMutation } from '@tanstack/react-query'
import { likeBlog, addComment } from './services/blogs'
import { useState } from 'react'

const BlogView = ({ blog }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleLikeBlog = async (blog) => {
    const { id, ...blogWithLike } = blog
    blogWithLike.likes += 1
    blogWithLike.user = blog.user.id

    likeBlogMutation.mutate({ objectId: id, newObject: blogWithLike })
  }

  const handleCommentAdd = () => {
    const blogWithComment = {
      ...blog,
      comments: blog.comments.concat(comment),
      user: blog.user.id,
    }
    addCommentMutation.mutate(blogWithComment)
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => handleLikeBlog(blog)}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <input
        type='text'
        placeholder='Enter comment here'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></input>
      <button onClick={handleCommentAdd}>Add comment</button>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}
export default BlogView
