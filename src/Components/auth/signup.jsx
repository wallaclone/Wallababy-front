// sign up form. required fields: username, password, email
import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


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
    register()
  }

    return (
      <>
        <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={handleChange(setEmail)}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="username" placeholder="Enter username" onChange={handleChange(setUsername)}/>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={handleChange(setPassword)} />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
      </>
    )
  };