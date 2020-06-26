import React, { useState } from 'react';
import { Card, InputGroup, Form, Button }  from 'react-bootstrap';
import Swal from 'sweetalert2';
// import { Link } from 'react-router-dom';
// import passwordIco from '../img/password.png'
import loginIco from '../img/login.png'

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
        const url = `http://localhost:4000/api/recoverpassword`;
        const response = await fetch (url, {
            method: 'POST',
            body: JSON.stringify({
                'email' : objectForm.email.toString(),
            }),
            headers: {
                'content-type': 'application/json'
            },
            // credentials: 'include',
        });

        Swal.fire({
            //position: 'top-end',
            icon: 'success',
            title: `Password recovery`,
            text: `If there is an account associated with ${objectForm.email}, you will receive an email with a link to reset your password.`,
            // text: `If there is an account associated with the entered email, you will receive an email with a link to reset your password.`,
            //footer: '<a href>Why do I have this issue?</a>'
            //showConfirmButton: false,
            timer: 6000
        });
        props.history.push('/login');

        // if (response.status !== 201) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Incorrect email',
        //         text: `The email is incorrect. `,
        //         timer: 4000
        //     });
        // } else {
        //     Swal.fire({
        //         //position: 'top-end',
        //         icon: 'success',
        //         title: `Correct email`,
        //         text: `We have sent you an email with your password`,
        //         //footer: '<a href>Why do I have this issue?</a>'
        //         //showConfirmButton: false,
        //         timer: 5000
        //     });
        //     //props.history.push('/login');
        // }

    };
    
    return (
        <div className='padre-logIn-SignUp'>
        <div className='hijo-logIn-SignUp'>
            <form onSubmit={recoverPassword}>
            <Form.Group >
            <Card key='1'>
                <Card.Body>
                    <Card.Title className='centrado'>Password recovery for your account</Card.Title>
                    <Card.Text>
                        <InputGroup className='mb-3'>
                            <InputGroup.Prepend>
                                <InputGroup.Text id='emailText'>
                                    <Card.Img variant='top' src={loginIco} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type='email'
                                placeholder='Enter Email'
                                name='email'
                                // onChange={e => setObjectForm({ ...objectForm, [e.target.name] : e.target.value }) }
                                onChange={handleChange}
                                value={objectForm.email}
                                required
                            />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <Button type='submit' variant='primary' size='lg' className='button' block>
                            {/* <Button type='submit' size='lg' bsClass="button-ok" block> */}
                                Password Recovery
                            </Button>
                            <Button variant='warning' size='lg' onClick={handleClearButton} block>
                                Clear
                            </Button>   
                        </InputGroup>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className='centrado'>
                    <span className='text-muted'>New to Wallaclone?</span>
                    &nbsp;
                    <Card.Link href='/register'>Sign Up</Card.Link>
                </Card.Footer>
            </Card>
            </Form.Group>
            </form>
        </div>
        </div>
    );
}
export default PasswordRecovery;