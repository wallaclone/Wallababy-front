import React, { useState, useEffect, useContext } from 'react';

import { Button, Accordion, Card, Col, Form } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import apiCall from '../../api/api';
import { AuthContext } from '../../contexts/authContext';

const { isNotLogin, getUser, editUser, deleteUser } = apiCall();

function EditProfile(props) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  
  if( isNotLogin( user, props.intl.formatMessage({ id: 'createAd.notLoggedIn' }), props.intl.formatMessage({ id: 'createAd.youAreNotLoggedIn' }) ) ) { history.push('/login'); }

  // const username = window.localStorage.getItem('username');
  const [myUser, setmyUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [objectForm, setObjectForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  // const { username } = useParams();
  useEffect(() => {
    const setUserFunction = async () => {
      const response = await getUser(user);
      setmyUser(response);
      setObjectForm(response);
    };
    if (user) {
      setUserFunction();
    }
  }, [user]);

  const handleChange = (event) => {
    setObjectForm({
      ...objectForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleUserRemoveAccount = async () => {
    Swal.fire({
      title: props.intl.formatMessage({ id: 'sweetalert.areYouSure' }),
      text: props.intl.formatMessage({ id: 'sweetalert.noRevert' }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1768ac',
      cancelButtonColor: '#d33',
      confirmButtonText: props.intl.formatMessage({ id: 'sweetalert.deleteIt' }),
      cancelButtonText: props.intl.formatMessage({ id: 'sweetalert.cancel' }),
    }).then(async (result) => {
      if (result.value) {
        try {
          const response = await deleteUser(myUser._id);
          history.push('/login');
          if (response.status === 201) {
            Swal.fire(
              props.intl.formatMessage({ id: 'sweetalert.deleted' }),
              props.intl.formatMessage({ id: 'sweetalert.adDeleted' }),
              props.intl.formatMessage({ id: 'sweetalert.success' }),
            );
          }
        } catch (error) {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: props.intl.formatMessage({ id: 'sweetalert.mistake' }),
          });
        }
      }
    });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const pass = document.getElementById('pass').value;
    const confirm_password = document.getElementById('confirm').value;
    const user_email = document.getElementById('user_email').value;
    /* let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('username', "q");
        console.log("params",currentUrlParams); */

    if (!validateEmail(user_email) && user_email) {
      Swal.fire({
        type: 'error',
        icon: 'error',
        title: 'Error',
        text: props.intl.formatMessage({ id: 'sweetalert.introduceValidEmail' }),
      });
      return;
    }

    if (pass !== confirm_password) {
      Swal.fire({
        type: 'error',
        icon: 'error',
        title: 'Error',
        text: props.intl.formatMessage({ id: 'sweetalert.passwordsAreNotTheSame' }),
      });
      return;
    }

    // console.log('se envia ', objectForm);
    const response = await editUser(myUser._id, objectForm);
    // console.log('respuesta', response);
    if (response.response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: props.intl.formatMessage({ id: 'sweetalert.updateSuccesfully' }),
        text: props.intl.formatMessage({ id: 'sweetalert.profileUpdated' }),
        timer: 10000,
        confirmButtonColor: '#E29578',
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        type: 'error',
        icon: 'error',
        title: 'Error',
        text: response.message,
      });
    }
  };

  return (
    <div className="m-3">
      <h2 className='titles'>{props.intl.formatMessage({ id: 'header.editYourProfile' })}</h2>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="mt-3">
              <h6>{props.intl.formatMessage({ id: 'editProfile.username' })}&nbsp;({user})</h6>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {/* <input type="text" name="username" placeholder={props.intl.formatMessage({ id: 'editProfile.usernamePlaceholder' })} onChange={handleChange} /> */}
              <Form.Control
                type="text"
                name="username"
                placeholder={props.intl.formatMessage({ id: 'editProfile.usernamePlaceholder' })} 
                onChange={handleChange}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" className="mt-3">
              <h6>{props.intl.formatMessage({ id: 'editProfile.email' })}&nbsp;({myUser.email})</h6>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {/* <input id="user_email" type="email" pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" name="email" placeholder={props.intl.formatMessage({ id: 'editProfile.emailPlaceholder' })} onChange={handleChange} /> */}
              <Form.Control
                type="email" 
                name="email" 
                id="user_email" 
                pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" 
                placeholder={props.intl.formatMessage({ id: 'editProfile.emailPlaceholder' })} 
                onChange={handleChange}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2" className="mt-3">
              <h6>{props.intl.formatMessage({ id: 'editProfile.password' })}&nbsp;(*****)</h6>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              {/* <input id="pass" type="password" name="password" placeholder={props.intl.formatMessage({ id: 'editProfile.passwordPlaceholder' })} onChange={handleChange} /> */}
              <Form.Control
                type="password" 
                name="password" 
                id="pass" 
                placeholder={props.intl.formatMessage({ id: 'editProfile.passwordPlaceholder' })} 
                onChange={handleChange}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2" className="mt-3">
              <h6>{props.intl.formatMessage({ id: 'editProfile.confirmPassword' })}&nbsp;(*****)</h6>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              {/* <input id="confirm" type="password" name="confirm_password" placeholder={props.intl.formatMessage({ id: 'editProfile.confirmPasswordPlaceholder' })} onChange={handleChange} /> */}
              <Form.Control
                type="password" 
                name="confirm_password" 
                id="confirm" 
                placeholder={props.intl.formatMessage({ id: 'editProfile.confirmPasswordPlaceholder' })} 
                onChange={handleChange}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Form.Row className='mt-3'>
        <Form.Group as={Col} controlId="formGridCreateAd">
          <Button size='lg' variant='secondary' className='button' onClick={(event) => handleUserUpdate(event)} block>{props.intl.formatMessage({ id: 'editProfile.updateMyProfile' })}</Button>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCreateAd">
          <Button size='lg' variant='danger' onClick={() => handleUserRemoveAccount()} block>{props.intl.formatMessage({ id: 'editProfile.removeMyAccount' })}</Button>
        </Form.Group>
      </Form.Row>
    </div>
  );
}
const Editprofile = injectIntl(EditProfile);
export { Editprofile };