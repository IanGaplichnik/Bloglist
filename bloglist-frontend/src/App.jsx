import { useEffect, useContext } from 'react'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import { UserContext } from './UserContext'
import blogService from './services/blogs'
import { BrowserRouter as Router } from 'react-router-dom'

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

  return (
    <Router>
      <div>
        {!user && <LoginForm />}
        {user && <MainPage />}
      </div>
    </Router>
  )
}

export default App
