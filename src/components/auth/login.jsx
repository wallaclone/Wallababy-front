import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Form, Card } from 'react-bootstrap';

import apiCall from '../api/api';

const { login } = apiCall();


export default function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const response = await login(username, password);
    if (response.status !== 201) {
      props.history.push('/login');
    }

  }

  return (
    <>
    <div className='card-border'>
    <Card className='mycard'>
      <h2 className='auth-title'>Login to Wallaclone!</h2>
      <Form className='myform' onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control  icon="user" required type="text" onChange={handleChange(setUsername)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password"  onChange={handleChange(setPassword)} />
         <Link to='/passwordrecovery' className='forgot-pass'><p>Forgot password?</p></Link>
        </Form.Group>

        <Button className='mybutton' variant="primary" type="submit">
          Login
  </Button>
      </Form>
      <Card.Footer><span className='text-muted'>New to Wallaclone?  </span><Link to='/signup'>Sign up!</Link></Card.Footer>
      </Card>
      </div>
    </>
  )
};