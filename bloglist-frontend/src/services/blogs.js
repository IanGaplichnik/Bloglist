import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const createBlogOnServer = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const likeBlog = async (updateInfo) => {
  const response = await axios.put(
    `${baseUrl}/${updateInfo.objectId}`,
    updateInfo.newObject
  )
}

export const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const deleteFromServer = async (objectIdToDelete) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${objectIdToDelete}`, config)
  return response.data
}

export default { setToken }
