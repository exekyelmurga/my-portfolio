import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    picture: ''
  })

  useEffect(() => {
    fetch('https://api-user-list.onrender.com/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values,
      [name]: value
    })
  }
  const handleForm = async (event) => {
    event.preventDefault(); // Evita que el formulario se recargue

  // Enviar la solicitud PUT a la API
  const response = await fetch(
    "https://api-user-list.onrender.com/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    }
  );
  if (response.ok) {
    // El usuario se ha actualizado correctamente
    console.log("Usuario creado!");
  } else {
    // Mostrar un mensaje de error
    const error = await response.text();
    console.error("Error al actualizar usuario:", error);
  }
  fetch('https://api-user-list.onrender.com/users')
    .then(res => res.json())
    .then(data => setUsers(data))
    window.scroll(0, 0)
  }

  const handleDelete = async (event, id) => {
    event.preventDefault(); // Evita que el formulario se recargue

  // Enviar la solicitud PUT a la API
  const response = await fetch(
    `https://api-user-list.onrender.com/users/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    // El usuario se ha eliminado correctamente
    console.log("Usuario eliminado!");
  } else {
    // Mostrar un mensaje de error
    const error = await response.text();
    console.error("Error al actualizar usuario:", error);
  }
  await fetch('https://api-user-list.onrender.com/users')
    .then(res => res.json())
    .then(data => setUsers(data))
    window.scroll(0, 0)
}

  return (
    <main className="App">
      <section className='navbar'>
        <button className='navbutton'>Ordenar por nombre</button>
        <button className='navbutton'>ordernar por edad</button>
        <form method="post" action="" className='form-name'>
          <fieldset>
            <legend>Buscar por nombre</legend>
            <label>Nombre: 
              <input type="text"name='name'
              placeholder='Ezequiel Murga Pereyra'/>
            </label>
          </fieldset>
        </form>
      </section>
      <section className='content'>
      {users.map(user => (
        <span key={user._id}>
          <img src={user.picture} alt= {`${user.name} picture`} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.age}</p>
          <button onClick={(e) => handleDelete(event, user._id)}>Eliminar</button>
        </span>
      ))}
      </section>
      <section className='create_user'>
      <form onSubmit={handleForm}>
          <fieldset>
            <legend>Nombre del usuario</legend>
            <label>Nombre: 
              <input type="text"
              name='name'
              placeholder='Ezequiel Murga Pereyra'
              required
              onChange={handleInputChange}
              value={values.name}
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>Edad del usuario</legend>
            <label>Edad:  
              <input type="number"
              name='age'
              placeholder='85' 
              required
              onChange={handleInputChange}
              value={values.age}
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>Email del usuario</legend>
            <label>Email:  
              <input type='email' 
              name='email'
              placeholder='ezequiel.murga@gmail.com' 
              required
              onChange={handleInputChange}
              value={values.email}
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>Imagen</legend>
            <label>URL:  
              <input type='link' 
              name='picture'
              placeholder='img' 
              required
              onChange={handleInputChange}
              value={values.picture}
              />
            </label>
          </fieldset>
          <button type='submit'>Crear usuario</button>
        </form>
      </section>
    </main>
  );
}

export default App
