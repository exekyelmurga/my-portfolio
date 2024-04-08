import { useState, useEffect, useRef, useMemo} from 'react'
import './App.css'


function App() {

  const [users, setUsers] = useState([])
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    picture: ''
  })

  const [update, setUpdate] = useState({
    id: '',
    name: '',
    email: '',
    age: ''
  })
  const [filterUsers, setFilterUsers] = useState(null);
  const [filterId, setFilterId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const indexOfLastUser = currentPage * usersPerPage //pag x 9
  const indexOfFirstUser = indexOfLastUser - usersPerPage //primera = la ultima - recetas por pag
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const originalUsers = useRef([])
  
  const pageNumbers = []
    for(let i = 1; i <= Math.ceil(users.length/usersPerPage); i++) {
        pageNumbers.push(i)
    }


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api-user-list.onrender.com/users');
        const data = await response.json();
        setUsers(data);
        originalUsers.current = data; // Update the originalUsers reference
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call the fetch function within useEffect
  }, []);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values,

      [name]: value
    })
  }

  const handleInputChangeUpdate = (event) => {
    const {name, value} = event.target;
    setUpdate({
      ...update,

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
    // El usuario se ha creado correctamente
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

  const handleFormUpdate = async (event) => {
    event.preventDefault();
    console.log(update) 
  const response = await fetch(
    `https://api-user-list.onrender.com/users/${update.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update)
    }
  );
  if (response.ok) {
    // El usuario se ha actualizado correctamente
    console.log("Usuario actualizado!");
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

  const deleteUser = (id) => {
    const filteredUsers = users.filter((user) => user._id !== id)
    setUsers(filteredUsers)
  }

//   const handleDelete = async (event, id) => {
//     event.preventDefault(); // Evita que el formulario se recargue

//   // Enviar la solicitud PUT a la API
//   const response = await fetch(
//     `https://api-user-list.onrender.com/users/${id}`,
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   if (response.ok) {
//     // El usuario se ha eliminado correctamente
//     console.log("Usuario eliminado!");
//   } else {
//     // Mostrar un mensaje de error
//     const error = await response.text();
//     console.error("Error al actualizar usuario:", error);
//   }
//   await fetch('https://api-user-list.onrender.com/users')
//     .then(res => res.json())
//     .then(data => setUsers(data))
//     window.scroll(0, 0)
// }

const handleReset = () => {
  setUsers(originalUsers.current)
}

useEffect(() => {
  if(filterUsers != null && filterUsers.length > 0) {
    const filtered = users.filter(user => user.name.toLocaleLowerCase().includes(filterUsers.toLocaleLowerCase()));
    setUsers(filtered)
  }
  else handleReset()
}, [filterUsers])

useEffect(() => {
  if(filterId != null && filterId.length > 0) {
    const filtered = users.filter(user => user._id.toLocaleLowerCase().includes(filterId.toLocaleLowerCase()));
    setUsers(filtered)
  }
  else handleReset()
}, [filterId])

  return (
    <main className="App">
      <section className='navbar'>
        <button onClick={handleReset}>Resetear estado</button>
        <input placeholder='Filtrar por nombre' onChange={(e) => {
          setFilterUsers(e.target.value)
        }}/>
        <input placeholder='Filtrar por id' onChange={(e) => {
          setFilterId(e.target.value)
        }}/>
        <h2>Total de usuarios {users.length}</h2>
      </section>

      <div className="pag">
        {pageNumbers?.map((number) => (
        <div key={number}>
            <div className="numeritos" key={`${number}-paginado`}>
            <button id="boton" onClick={() => paginado(number)}>{number}</button>
            </div>
        </div>
        ))}
      </div>

      <section className='content'>
      {currentUsers.map(user => (
        <span key={user._id}>
          <img src={user.picture} alt= {`${user.name} picture`} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.age}</p>
          <p>{user._id}</p>
          <button onClick={() => {deleteUser(user._id)}}>Eliminar</button>
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

      <section className='create_user'>
      <form onSubmit={handleFormUpdate}>
      <fieldset>
            <legend>Id del usuario</legend>
            <label>Id: 
              <input type="text"
              name='id'
              placeholder='6610c0ed5e395ae9e58bde5d'
              required
              onChange={handleInputChangeUpdate}
              value={update.id}
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Nombre del usuario</legend>
            <label>Nombre: 
              <input type="text"
              name='name'
              placeholder='Ezequiel Murga Pereyra'
              required
              onChange={handleInputChangeUpdate}
              value={update.name}
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
              onChange={handleInputChangeUpdate}
              value={update.age}
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
              onChange={handleInputChangeUpdate}
              value={update.email}
              />
            </label>
          </fieldset>

          <button type='submit'>Actualizar usuario</button>
        </form>
      </section>
    </main>
  );
}

export default App
