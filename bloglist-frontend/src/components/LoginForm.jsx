import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { NotificationContext } from './NotificationContext'
import { UserContext } from '../UserContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatchNotification } = useContext(NotificationContext)
  const { dispatchUser } = useContext(UserContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('Logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      const nameForNotification = user.name ? user.name : user.username
      dispatchUser({ type: 'SET_USER', payload: user })
      dispatchNotification({
        type: 'SET_SUCCESS',
        payload: `User ${nameForNotification} logged in`,
      })
      setTimeout(() => dispatchNotification({ type: 'RESET' }), 5000)
      setPassword('')
      setUsername('')
    } catch (exception) {
      dispatchNotification({
        type: 'SET_FAILURE',
        payload: 'Wrong credentials',
      })
      setTimeout(() => dispatchNotification({ type: 'RESET' }), 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Notification />
      <div>
        username{' '}
        <input
          type='text'
          value={username}
          name='Username'
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{' '}
        <input
          type='text'
          value={password}
          name='Password'
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' id='login-button'>
        login
      </button>
    </form>
  )
}

export default LoginForm
