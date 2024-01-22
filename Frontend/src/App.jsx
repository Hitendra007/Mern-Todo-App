import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './Components/TodoForm'
import Todos from './Components/Todos'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import * as api from './api'
import { settodos } from './store/todoSlice'
// import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
function App() {
  const [loading, setLoading] = useState(true)
  const [registerorlogin, setRegisterorlogin] = useState(false)
  const dispatch = useDispatch()
  const status = useSelector(state => state.todo.status)
  const [loggedIn, setLoggedIn] = useState(status)
  const email = useSelector(state=>state.todo.email)
  console.log(status,email)
  useEffect(() => {
    const fetchtodos = async ()=>{
      try {
          // let id=user
          console.log(email)
          let result = await api.getTasks(email)
          console.log(result.data.data)

          dispatch(settodos(result.data.data))
      } catch (error) {
        console.log('errror in app')
      }
    }
    if(status)fetchtodos();
    setLoggedIn(status);
  }, [status]);
  const handleToggleRegisterLogin = () => {
    setRegisterorlogin((prev) => !prev);
  };

  return (
    <div className="app-container">
      {loggedIn ? (
        <>
          <TodoForm />
          <Todos />
        </>
      ) : (
        <>
          {registerorlogin ? <Register /> : <Login />}
          <div className="toggle-button">
            <button onClick={handleToggleRegisterLogin}>
              {registerorlogin ? 'Already a user? Login' : 'New user? Register'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
