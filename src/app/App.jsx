import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://api-user-list.onrender.com/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  return (
    <div className="App">
      {users.map(user => (
        <div key={user._id}>
          <img src={user.picture} alt= {`${user.name} picture`} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App
