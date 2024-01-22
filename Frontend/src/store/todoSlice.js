import { nanoid } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status:false,
  userId:'',
  email:"",
  todos: [
    {
      _id: 1,
      task: "To do leetcode ques 735",
    },
  ],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        _id: nanoid(),
        task: action.payload,
      };
      state.todos.push(todo);
      console.log(state.todos);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    updateUserstatus:(state,action)=>{
      state.status=action.payload
    },
    setUserid:(state,action)=>{
      state.userId=action.payload
    },setUseremail:(state,action)=>{
      state.email=action.payload
    },
    settodos:(state,action)=>{
      state.todos=[...state.todos,...action.payload]
      console.log(state.todos)
    }
  },
});
console.log(todoSlice.actions)
export const {settodos,setUseremail,setUserid,addTodo,deleteTodo,updateUserstatus} = todoSlice.actions
export default todoSlice.reducer;
