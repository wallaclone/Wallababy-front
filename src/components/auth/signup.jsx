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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(username, password, email);
    (response.status !== 201) ? props.history.push('/signup') : props.history.push('/login')
  }

  return (
    <>

      <div className='card-border'>
        <Card className='mycard'>
          <h2 className='auth-title'>Sign up to Wallaclone!</h2>
          <Form className='myform' onSubmit={handleSubmit}>
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
            <Button className='mybutton' variant="primary" type="submit">
              Sign up
            </Button>
          </Form>
          <Card.Footer><span className='text-muted'>Already registered?</span> <Link to='/login'>Login!</Link></Card.Footer>
        </Card>
      </div>
    </>
  )
};