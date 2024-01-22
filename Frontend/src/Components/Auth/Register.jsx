import React from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
function Register() {
  return (
    <>
       <Container className='header'>
        <h1 className='logo'>Todo's</h1>
       </Container>
       <Container className='mainContainer' style={{width:'50vh'}}>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit" className='sbtn'>
        Register
      </Button>
      {/* <Link to="login" className='loginLink'>Login here!</Link> */}
    </Form>
       </Container>
    </>
  )
}

export default Register
