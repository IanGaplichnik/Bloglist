import Blog from './Blog'
import { useQueryClient } from '@tanstack/react-query'

const BlogListSorted = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])

  const sortedBlogList = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => <Blog key={blog.id} blog={blog} />)

  return sortedBlogList()
}

export default BlogListSorted
