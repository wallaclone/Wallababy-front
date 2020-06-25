// sign up form. required fields: username, password, email
import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';


import apiCall from '../api/api';

const { register } = apiCall();


export default function SignUp(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();


  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password, email);
  }

  return (
    <>
      <h1>Sign up to Wallaclone!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Email" onChange={handleChange(setEmail)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
    </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control  icon="user" required type="text" placeholder="Username" onChange={handleChange(setUsername)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" onChange={handleChange(setPassword)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign up
  </Button>
  <p>Already registered? Click here to login!</p>
      </Form>
    </>
  )
};