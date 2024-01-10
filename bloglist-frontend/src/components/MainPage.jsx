import { useContext, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBlogs, getUsers } from '../services/blogs'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import BlogListSorted from './BlogListSorted'
import Notification from './Notification'
import { UserContext } from '../UserContext'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import StatsTable from './UserStats'
import UserBlogs from '../UserBlogs'
import BlogView from '../BlogView'

const PageHeader = () => {
  const { user, dispatchUser } = useContext(UserContext)
  const displayName = user.name ? user.name : user.username

  const logout = () => {
    dispatchUser({ type: 'RESET_USER' })
  }

  const menuStyle = {
    backgroundColor: 'lightgrey',
    padding: 0,
  }

  return (
    <div>
      <header style={menuStyle}>
        <Notification />
        <p>
          <Link to={'/'}>blogs</Link> <Link to={'/users'}>users</Link> &nbsp;
          {displayName} is logged in &nbsp;
          <button onClick={logout}>logout</button>
        </p>
      </header>
      <h2>blog app</h2>
    </div>
  )
}

const BlogBlock = ({ blogs }) => {
  const togglableRef = useRef()

  return (
    <div>
      {blogs && (
        <>
          <Togglable buttonLabel='new blog' ref={togglableRef}>
            <BlogForm togglableRef={togglableRef} />
          </Togglable>
          <BlogListSorted />
        </>
      )}
    </div>
  )
}

const MainPage = () => {
  const getBlogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: 1,
  })

  const getUsersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: 1,
  })

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  if (getBlogsQuery.isLoading) return <div>Loading</div>
  if (getBlogsQuery.isError) return <div>Server problem</div>
  const blogs = getBlogsQuery.data

  if (getUsersQuery.isLoading) return <div>Loading</div>
  if (getUsersQuery.isError) return <div>Server problem</div>
  const users = getUsersQuery.data.sort(
    (a, b) => b.blogs.length - a.blogs.length
  )

  const userToDisplay = matchUser
    ? users.find((user) => String(user.id) === String(matchUser.params.id))
    : null

  const blogToDisplay = matchBlog
    ? blogs.find((blog) => String(blog.id) === String(matchBlog.params.id))
    : null

  return (
    <div>
      <PageHeader />
      <Routes>
        <Route path='/blogs/:id' element={<BlogView blog={blogToDisplay} />} />
        <Route
          path='/users/:id'
          element={<UserBlogs userToDisplay={userToDisplay} />}
        />
        <Route path='/users' element={<StatsTable users={users} />} />
        <Route path='/' element={<BlogBlock blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default MainPage
