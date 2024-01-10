import { useQueryClient } from '@tanstack/react-query'

const UserBlogs = ({ userToDisplay }) => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])

  const blogsOfUser = blogs.filter((blog) => blog.user.id === userToDisplay.id)

  const blogElements = () => {
    if (blogsOfUser.length === 0) return <li>No blogs yet</li>
    return blogsOfUser.map((blog) => <li key={blog.id}>{blog.title}</li>)
  }

  return (
    <div>
      <h2>{userToDisplay.name}</h2>
      <h3>added blogs</h3>
      <ul>{blogElements()}</ul>
    </div>
  )
}

export default UserBlogs
