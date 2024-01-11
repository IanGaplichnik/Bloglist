import { useState, useContext } from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import { NotificationContext } from './NotificationContext'
import { UserContext } from '../UserContext'
import {
  StyledPageWrapper,
  StyledFormWrapper,
  StyledInput,
  StyledLoginButton,
  StyledLoginForm,
} from './styles/LoginForm.style'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatchNotification } = useContext(NotificationContext)
  const { dispatchUser } = useContext(UserContext)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatchUser({ type: 'SET_USER', payload: user })
      dispatchNotification({
        type: 'SET_SUCCESS',
        payload: `User ${user.name} logged in`,
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
    <StyledPageWrapper>
      <StyledFormWrapper>
        <StyledLoginForm onSubmit={handleLogin}>
          <h2>BLOGAPP</h2>
          <p>Log in using your credentials</p>
          <Notification />
          <div>
            <StyledInput
              background={'../../assets/LoginInputLogo.png'}
              type='text'
              value={username}
              name='Username'
              id='username'
              onChange={({ target }) => setUsername(target.value)}
              placeholder='Username'
            />
          </div>
          <div>
            <StyledInput
              background={'../../assets/PasswordInputLogo.png'}
              type='text'
              value={password}
              name='Password'
              id='password'
              onChange={({ target }) => setPassword(target.value)}
              placeholder='Password'
            />
          </div>
          <StyledLoginButton type='submit' id='login-button'>
            LOG IN
          </StyledLoginButton>
        </StyledLoginForm>
      </StyledFormWrapper>
    </StyledPageWrapper>
  )
}

export default LoginForm
