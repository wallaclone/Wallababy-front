import React, { useState } from 'react';
import { Card, Form, Button }  from 'react-bootstrap';

import apiCall from '../api/api';
import Swal from 'sweetalert2';

const { changePassword } = apiCall();

export default function ChangePassword(props) {
    const userId = props.match.params.id;
    const [ objectForm, setObjectForm ] = useState ({
        password : '',
        confirm_password: ''
    });

    const handleChange = (event) => {
        setObjectForm({
            ...objectForm,
            [event.target.name] : event.target.value,
        });
    };

    const changePasswordSubmit = async (event) => {
        event.preventDefault();
        const password = objectForm.password;
        const confirm_password = objectForm.confirm_password;
        
        if (password !== confirm_password){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `The passwords dont match`,
                timer: 5000,
                confirmButtonColor:  '#E29578',
            });
            setObjectForm({ password: '', confirm_password: ''});
            return;
        }
        const response = await changePassword(userId, objectForm.password);
        
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Password updated',
                text: `Your password has been updated correctly`,
                timer: 5000,
                confirmButtonColor:  '#E29578',
            });
            props.history.push('/login');
        }

    };
    
    return (
        <div className='padre-logIn-SignUp'>
        <div className='hijo-logIn-SignUp'>
            <Form onSubmit={changePasswordSubmit}>
            <Form.Group >
            <Card key='1'>
                <Card.Body>
                    <Card.Title className='centrado'>Password recovery for your account</Card.Title>
                    <Card.Text>
                        <Form.Control type='password' className='mb-2'
                            placeholder='Enter Password'
                            name='password'
                            onChange={handleChange}
                            value={objectForm.password}
                            required
                        />
                        <Form.Control type='password' className='mb-2'
                            placeholder='Confirm Password'
                            name='confirm_password'
                            onChange={handleChange}
                            value={objectForm.confirm_password}
                            required
                        />
                        <Button type='submit' variant='primary' className='button' block>
                            ChangePassword
                        </Button>  
                    </Card.Text>
                </Card.Body>
            </Card>
            </Form.Group>
            </Form>
        </div>
        </div>
    );
}