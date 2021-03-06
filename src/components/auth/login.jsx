import React, { useState } from 'react';

import { Button, Form, Card } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import apiCall from '../../api/api';

const { login } = apiCall();

function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(username, password);
    if (response.status !== 201) {
      Swal.fire({
        icon: 'error',
        title: props.intl.formatMessage({ id: 'sweet.alertWrongCredentials' }),
        text: props.intl.formatMessage({ id: 'sweet.alertWrongCredentialsText' }),
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
    (response.status !== 201) ? history.push('/login') : history.push('/dashboard');
  };

  return (
    <>
      <div className="card-border">
        <Card className="mycard">
          <h2 className="auth-title">{props.intl.formatMessage({ id: 'login.title' })}</h2>
          <Form className="myform" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>{props.intl.formatMessage({ id: 'login.userName' })}</Form.Label>
              <Form.Control
                type="text"
                icon="user"
                required
                onChange={handleChange(setUsername)}
                placeholder={props.intl.formatMessage({ id: 'login.userNamePlaceholder' })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>{props.intl.formatMessage({ id: 'login.password' })}</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={handleChange(setPassword)}
                placeholder={props.intl.formatMessage({ id: 'changePassword.passwordPlaceholder' })}
              />
              <Link to="/passwordrecovery" className="forgot-pass"><p>{props.intl.formatMessage({ id: 'login.forgotPassword' })}</p></Link>
            </Form.Group>

            <Button className="mybutton" variant="primary" type="submit">
              {props.intl.formatMessage({ id: 'all.logIn' })}
            </Button>
          </Form>
          <Card.Footer>
            <span className="text-muted">
              {props.intl.formatMessage({ id: 'all.newAPP' })}
            </span>
        &nbsp;
            <Link to="/signup">
              {props.intl.formatMessage({ id: 'all.signUp' })}
              !
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}
const LogIn = injectIntl(Login);
export { LogIn };
