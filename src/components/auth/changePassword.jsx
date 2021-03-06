import React, { useState } from 'react';

import { Card, Form, Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import apiCall from '../../api/api';

const { changePassword } = apiCall();

function ChangePassword(props) {
  const history = useHistory();
  const { id } = useParams();
  // const userId = props.match.params.id;
  const userId = id;

  const [objectForm, setObjectForm] = useState({
    password: '',
    confirm_password: '',
  });

  const handleChange = (event) => {
    setObjectForm({
      ...objectForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleClearButton = () => {
    setObjectForm({
      password: '',
      confirm_password: '',
    });
  };

  const changePasswordSubmit = async (event) => {
    event.preventDefault();
    const { password } = objectForm;
    const { confirm_password } = objectForm;

    if (password !== confirm_password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: props.intl.formatMessage({ id: 'changePassword.passwordsDontMatch' }),
        timer: 5000,
        confirmButtonColor: '#1768ac',
      });
      setObjectForm({ password: '', confirm_password: '' });
      return;
    }
    const response = await changePassword(userId, objectForm.password);

    if (response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: props.intl.formatMessage({ id: 'changePassword.updatedPassword' }),
        text: props.intl.formatMessage({ id: 'changePassword.passwordUpdatedCorrectly' }),
        timer: 5000,
        confirmButtonColor: '#1768ac',
      });
      history.push('/login');
    }
  };

  return (
    <div className="card-border">
      <Card className="mycard">
        <h2 className="auth-title">{props.intl.formatMessage({ id: 'passwordRecovery.title' })}</h2>
        <Form className="myform" onSubmit={changePasswordSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>{props.intl.formatMessage({ id: 'changePassword.phrasePassword' })}</Form.Label>
            <Form.Control
              type="password"
              className="mb-2"
              placeholder={props.intl.formatMessage({ id: 'changePassword.passwordPlaceholder' })}
              name="password"
              onChange={handleChange}
              value={objectForm.password}
              required
            />
            <Form.Control
              type="password"
              className="mb-2"
              placeholder={props.intl.formatMessage({ id: 'changePassword.confirmPasswordPlaceholder' })}
              name="confirm_password"
              onChange={handleChange}
              value={objectForm.confirm_password}
              required
            />
          </Form.Group>

          <Button className="mybutton" variant="primary" type="submit">
            {props.intl.formatMessage({ id: 'changePassword.passwordUpdated' })}
          </Button>

          <Button variant="warning" onClick={handleClearButton} className="mb-4" block>
            {props.intl.formatMessage({ id: 'all.clear' })}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
const Changepassword = injectIntl(ChangePassword);
export { Changepassword };
// export default ChangePassword;
