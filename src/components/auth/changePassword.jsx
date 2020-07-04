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

    const handleClearButton = () => {
        setObjectForm({
            password : '',
            confirm_password: ''
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
        <div className='card-border'>
            <Card className='mycard'>
                <h2 className='auth-title'>Password recovery</h2>
                <Form className='myform' onSubmit={changePasswordSubmit}>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter the same password in both fields</Form.Label>
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
                    {/* <Form.Control required type="email" 
                        placeholder='Enter Email'
                        name='email'
                        value={objectForm.email}
                        onChange={handleChange} 
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>
                
                <Button className='mybutton' variant="primary" type="submit">
                    Password updated
                </Button>

                <Button variant='warning' onClick={handleClearButton} className='mb-4' block>
                    Clear
                </Button>
            </Form>
            {/* <Card.Footer><span className='text-muted'>New to Wallaclone?</span> <Link to='/signup'>Sign Up</Link></Card.Footer> */}
            </Card>
        </div>
    );
}