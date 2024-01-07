import '../index.css'
import PropTypes from 'prop-types'
import { NotificationContext } from './NotificationContext'
import { useContext } from 'react'

const Notification = () => {
  const { notification } = useContext(NotificationContext)

  if (!notification.msg) return null
  return (
    <div className={notification.status}>
      <p>{notification.msg}</p>
    </div>
  )
}

export default Notification
