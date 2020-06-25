import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';


import apiCall from '../api/api';

const { login } = apiCall();


export default function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  }

  return (
    <>
      <h1>Login to Wallaclone!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control  icon="user" required type="text" placeholder="Username" onChange={handleChange(setUsername)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" onChange={handleChange(setPassword)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
  </Button>
  <p>New to Wallaclone? Sign up!</p>
      </Form>
    </>
  )
};