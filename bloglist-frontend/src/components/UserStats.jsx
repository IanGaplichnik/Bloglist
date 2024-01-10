import { Link } from 'react-router-dom'

const UserStatsTableBody = ({ users }) => {
  return (
    <tbody>
      {users.map((user) => (
        <tr key={user.name}>
          <td>
            <Link to={user.id}>{user.name}</Link>
          </td>
          <td>{user.blogs.length}</td>
        </tr>
      ))}
    </tbody>
  )
}

const StatsTable = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>&nbsp;</td>
          <td>
            <b>blogs created</b>
          </td>
        </tr>
      </thead>
      <UserStatsTableBody users={users} />
    </table>
  )
}

export default StatsTable
