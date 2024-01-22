import React, { useEffect } from 'react'
import './Todos.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../store/todoSlice'
function Todos() {
   const alltodos = useSelector(state => state.todo.todos)
   const dispatch = useDispatch()
   const deleteT=(id)=>{
    dispatch(deleteTodo(id))
   }
   useEffect(()=>{
    console.log(alltodos)
   },[alltodos])
  return (
   <>
      <div className='main'>
      <div className='todos'>
         {
          alltodos.map((todo)=>(
          <div key={todo._id} >
            <input type="checkbox" id='checkbox'/>
            <p>{todo.task}</p>
            <button onClick={()=>{deleteT(todo._id)}}>Remove</button>
          </div>
          ))
         }
      </div>
     

      </div>
   </>
  )
}

export default Todos
