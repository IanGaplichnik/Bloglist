import { createContext, useReducer } from 'react'
import blogService from './services/blogs'

export const UserContext = createContext()

const userReducer = (state, action) => {
  const loggedBlogappUserKey = 'loggedBlogappUser'
  switch (action.type) {
    case 'SET_USER': {
      const user = action.payload
      window.localStorage.setItem(loggedBlogappUserKey, JSON.stringify(user))
      blogService.setToken(user.token)
      return user
    }
    case 'RESET_USER': {
      console.log('here')
      window.localStorage.removeItem(loggedBlogappUserKey)
      blogService.setToken(null)
      return null
    }
    default:
      return state
  }
}

export const UserContextProvider = (props) => {
  const [user, dispatchUser] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={{ user, dispatchUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
