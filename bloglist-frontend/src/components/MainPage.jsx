import { useContext, useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import BlogListSorted from './BlogListSorted'
import Notification from './Notification'
import { UserContext } from '../UserContext'
import { Routes, Route } from 'react-router-dom'
import UserStats from './UserStats'

const PageHeader = () => {
  const { user, dispatchUser } = useContext(UserContext)
  const displayName = user.name ? user.name : user.username

  const logout = () => {
    dispatchUser({ type: 'RESET_USER' })
  }

  return (
    <header>
      <h2>blogs</h2>
      <Notification />
      <p>
        {displayName} is logged in <button onClick={logout}>logout</button>
      </p>
    </header>
  )
}

const BlogBlock = ({ blogs }) => {
  const { user } = useContext(UserContext)
  const togglableRef = useRef()
  console.log(blogs)

  return (
    <div>
      {blogs && (
        <>
          <Togglable buttonLabel='new blog' ref={togglableRef}>
            <BlogForm togglableRef={togglableRef} />
          </Togglable>

          <BlogListSorted blogs={blogs} user={user} />
        </>
      )}
    </div>
  )
}

const MainPage = ({ blogs }) => {
  return (
    <div>
      <PageHeader />
      <Routes>
        <Route path='/users' element={<UserStats blogs={blogs} />} />
        <Route path='/' element={<BlogBlock blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default MainPage
