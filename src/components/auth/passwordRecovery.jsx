import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button }  from 'react-bootstrap';
// import Swal from 'sweetalert2';
import apiCall from '../api/api';

const { passwordRecovery } = apiCall();

function PasswordRecovery(props) {

    const [ objectForm, setObjectForm ] = useState ({
        email : '',
    });

    const handleChange = (event) => {
        setObjectForm({
            ...objectForm,
            [event.target.name] : event.target.value,
        });
    };

    const handleClearButton = () => {
        setObjectForm({
            email : '',
        });
    };

    const recoverPassword = async (event) => {
        event.preventDefault();

        const response = await passwordRecovery(objectForm.email.toString());
        
        // const url = `http://localhost:4000/api/recoverpassword`;
        // const response = await fetch (url, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         'email' : objectForm.email.toString(),
        //     }),
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     // credentials: 'include',
        // });

        // Swal.fire({
        //     //position: 'top-end',
        //     icon: 'success',
        //     title: `Password recovery`,
        //     text: `If there is an account associated with ${objectForm.email}, you will receive an email with a link to reset your password.`,
        //     // text: `If there is an account associated with the entered email, you will receive an email with a link to reset your password.`,
        //     //footer: '<a href>Why do I have this issue?</a>'
        //     //showConfirmButton: false,
        //     timer: 6000
        // });
        // props.history.push('/login');

        // if (response.status !== 201) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Incorrect email',
        //         text: `The email is incorrect. `,
        //         timer: 5000
        //     });
        // } else {
        //     Swal.fire({
        //         //position: 'top-end',
        //         icon: 'success',
        //         title: `Correct email`,
        //         text: `We have sent you an email with your password`,
        //         //footer: '<a href>Why do I have this issue?</a>'
        //         //showConfirmButton: false,
        //         timer: 10000
        //     });
        //     props.history.push('/login');
        // }

        if (response.status === 201) {
            props.history.push('/login');
        }

    };
    
    return (
        <div className='card-border'>
            <Card className='mycard'>
                <h2 className='auth-title'>Password recovery</h2>
                <Form className='myform' onSubmit={recoverPassword}>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" 
                        placeholder='Enter Email'
                        name='email'
                        value={objectForm.email}
                        onChange={handleChange} 
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                
                <Button className='mybutton' variant="primary" type="submit">
                    Password Recovery
                </Button>

                <Button variant='warning' onClick={handleClearButton} className='mb-4' block>
                    Clear
                </Button>
            </Form>
            <Card.Footer><span className='text-muted'>New to Wallaclone?</span> <Link to='/signup'>Sign Up</Link></Card.Footer>
            </Card>
        </div>
    );
}
export default PasswordRecovery;