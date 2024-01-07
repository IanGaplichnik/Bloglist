import { useEffect, useContext } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import { useQuery } from '@tanstack/react-query'
import { getBlogs } from './services/blogs'
import { UserContext } from './UserContext'

const App = () => {
  const { user, dispatchUser } = useContext(UserContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: 1,
  })

  if (result.isLoading) return <div>Loading</div>
  if (result.isError) return <div>Server problem</div>
  const blogs = result.data

  return (
    <div>
      {!user && <LoginForm />}
      {user && <MainPage blogs={blogs} />}
    </div>
  )
}

export default App
