import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { BrowserRouter, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Register from './Components/Auth/Register.jsx'
import Login from './Components/Auth/Login.jsx'
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout></Layout>}>
//       <Route path='' element={<App></App>}></Route>
//       <Route path='register' element={<Register></Register>}></Route>
//       <Route path='login' element={<Login></Login>}></Route>
//     </Route>
//   )
// )
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <RouterProvider router={router}></RouterProvider> */}
      <App></App>
    </Provider>
  </React.StrictMode>,
)
