const UserStats = ({ blogs }) => {
  //todo: create query to get list of all users from /api/users
  const dict = {}
  console.log(blogs)

  blogs.forEach(({ user }) => {
    dict[user.name] = (dict[user.name] || 0) + 1
  })
  console.log(dict)

  return <div>{JSON.stringify(dict)}</div>
}

export default UserStats
