import React, { useState } from 'react';
import './TodoForm.css';
import { addTodo } from '../store/todoSlice';
import { useDispatch } from 'react-redux';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const dispatch = useDispatch();

  const add = () => {
    if (todo) {
      dispatch(addTodo(todo));
      setTodo('');
    }
  };

  const handleInput = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div className='todoform'>
      <h1>Todo's</h1>
      <input
        type="text"
        id='todoinput'
        value={todo}
        onChange={(e) => handleInput(e)}
        placeholder='Add todo here'
      />
      <button onClick={add}>Add todo</button>
    </div>
  );
}

export default TodoForm;
