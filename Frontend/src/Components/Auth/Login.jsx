import React, { useState } from 'react';
import './Login.css';
import * as api from '../../api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {updateUserstatus,setUserid,setUseremail} from '../../store/todoSlice'
import { useDispatch } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    // Call loginUser directly (not as part of API)
    try {
      const result = await api.loginUser( { email, password ,username: '' } );
      console.log(result);
      if(result.data.success=== true)
      {
         dispatch(updateUserstatus(true))
         dispatch(setUserid(result.data.data.user._id))
         dispatch(setUseremail(result.data.data.user.email))

      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <Container className='header'>
        <h1 className='logo'>Todo's</h1>
      </Container>
      <Container className='mainContainer' style={{ width: '50vh' }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Bind value to state
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Bind value to state
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit} className='sbtn'>
            Login
          </Button>
          {/* <Link to="/" className='RegisterLink'>Register here</Link> */}
        </Form>
      </Container>
    </>
  );
}

export default Login;
