// api/index.js

import axios from 'axios';
const API = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    headers: {
        'Content-Type': 'application/json',
    },
});


export const createTask = (task) => API.post('/todos/createTodo', task);
export const getTasks = (email) => {
    return API.get(`/todos/getTodos?email=${email}`);
};
export const deleteTask = (taskId) => API.delete(`/todos/deleteTodo`, taskId);

export const loginUser = (userData) => {
    // Include the username in the request data
    const { email, password, username } = userData;
    console.log('index', email, password)
    return API.post('/users/login', { email, password });
};

export const registerUser = (userData) => API.post('/users/register', userData);
export const logoutUser = () => API.post('/users/logout');
