// sign up form. required fields: username, password, email
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Form, Card } from 'react-bootstrap';

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
    props.history.push('/login')
  }

  return (
    <>

      <div className='card-border'>
        <Card>
          <h1 className='auth-title'>Sign up to Wallaclone!</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" onChange={handleChange(setEmail)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control required type="text" onChange={handleChange(setUsername)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" onChange={handleChange(setPassword)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Form>
          <Card.Footer>Already registered? <Link to='/login'>Login!</Link></Card.Footer>
        </Card>
      </div>
    </>
  )
};