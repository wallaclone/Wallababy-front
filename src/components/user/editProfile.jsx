import React, { useState, useEffect, useContext } from 'react';

import { Button, Accordion, Card } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import apiCall from '../../api/api';
import { AuthContext } from '../../contexts/authContext';

const { getUser, editUser, deleteUser } = apiCall();

function EditProfile(props) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.value) {
        try {
          const response = await deleteUser(myUser._id);
          history.push('/login');
          if (response.status === 201) {
            Swal.fire(
              'Deleted!',
              'Your account has been removed.',
              'success',
            );
          }
        } catch (error) {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'There was a mistake. Try again.',
          });
        }
      }
    });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        text: 'Introduce a valid email please.',
      });
      return;
    }

    if (pass !== confirm_password) {
      Swal.fire({
        type: 'error',
        icon: 'error',
        title: 'Error',
        text: 'The password and confirm password are not the same.',
      });
      return;
    }
    console.log('se envia ', objectForm);
    const response = await editUser(myUser._id, objectForm);
    console.log('respuesta', response);
    if (response.response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Update Succesfully',
        text: 'Your profile has been updated successfully.',
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
    <div>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Username:
              {user}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <input type="text" name="username" placeholder="Write your new username" onChange={handleChange} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Email:
              {myUser.email}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <input id="user_email" type="email" pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" name="email" placeholder="Write your new email" onChange={handleChange} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Password
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <input id="pass" type="password" name="password" placeholder="Write your new password" onChange={handleChange} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Confirm password
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <input id="confirm" type="password" name="confirm_password" placeholder="Write your new password" onChange={handleChange} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Button onClick={(event) => handleUserUpdate(event)}>Update my profile</Button>
        <Button onClick={() => handleUserRemoveAccount()}>Remove my Account</Button>
      </Accordion>
    </div>
  );
}

const Editprofile = injectIntl(EditProfile);
export { Editprofile };
