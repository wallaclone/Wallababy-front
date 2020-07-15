// sign up form. required fields: username, password, email
import React, { useState } from 'react';

import { Button, Form, Card } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import apiCall from '../../api/api';

const { register } = apiCall();

function Signup(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const history = useHistory();

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(username, password, email);
    if (response.status !== 201) {
      Swal.fire({
        icon: 'error',
        title: props.intl.formatMessage({ id: 'sweet.alert.signUpError' }),
        timer: 8000,
        confirmButtonColor: '#1768ac',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: `${props.intl.formatMessage({ id: 'sweet.alert' })} ${username}!`,
        text: '',
        timer: 15000,
        confirmButtonColor: '#1768ac',
      });
    }
    // (response.status !== 201) ? props.history.push('/signup') : props.history.push('/login')
    (response.status !== 201) ? history.push('/signup') : history.push('/login');
  };

  return (
    <>
      <div className="card-border">
        <Card className="mycard">
          <h2 className="auth-title">{props.intl.formatMessage({ id: 'signUp.title' })}</h2>
          <Form className="myform" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                onChange={handleChange(setEmail)}
                placeholder={props.intl.formatMessage({ id: 'passwordRecovery.emailPlaceholder' })}
              />
              <Form.Text className="text-muted">
                {props.intl.formatMessage({ id: 'passwordRecovery.phrase' })}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>{props.intl.formatMessage({ id: 'login.userName' })}</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={handleChange(setUsername)}
                placeholder={props.intl.formatMessage({ id: 'login.userNamePlaceholder' })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>{props.intl.formatMessage({ id: 'login.password' })}</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={handleChange(setPassword)}
                placeholder={props.intl.formatMessage({ id: 'changePassword.passwordPlaceholder' })}
              />
            </Form.Group>
            <Button className="mybutton" variant="primary" type="submit">
              {props.intl.formatMessage({ id: 'all.signUp' })}
            </Button>
          </Form>
          <Card.Footer>
            <span className="text-muted">{props.intl.formatMessage({ id: 'all.alreadyRegistered' })}</span>
            &nbsp;
            <Link to="/login">
              {props.intl.formatMessage({ id: 'signUp.logIn' })}
              !
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}
const SignUp = injectIntl(Signup);
export { SignUp };
// export default Signup;
