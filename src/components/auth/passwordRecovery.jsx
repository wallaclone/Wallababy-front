import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Card, Form, Button }  from 'react-bootstrap';
import Swal from 'sweetalert2';
import apiCall from '../../api/api';
import {FormattedMessage, injectIntl, FormattedDate, FormattedTime, FormattedRelativeTime} from 'react-intl';

const { passwordRecovery } = apiCall();

function PasswordRecovery(props) {

    const [ objectForm, setObjectForm ] = useState ({
        email : '',
    });

    const history = useHistory();

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
        if (response.status !== 201) {
            Swal.fire({
                icon: 'error',
                title: props.intl.formatMessage({ id: 'sweetalert.incorrectEmail' }),
                text: props.intl.formatMessage({ id: 'sweetalert.emailIncorrect' }),
                timer: 5000,
                confirmButtonColor:  '#1768ac',
            });
        } else {
            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: props.intl.formatMessage({ id: 'sweetalert.correctEmail' }),
                text: props.intl.formatMessage({ id: 'sweetalert.sentEmail' }),
                //footer: '<a href>Why do I have this issue?</a>',
                //showConfirmButton: false,
                timer: 10000,
                confirmButtonColor:  '#1768ac',
            });
            history.push('/login');
        }
    };
    
    return (
        <div className='card-border'>
            <Card className='mycard'>
                <h2 className='auth-title'>{props.intl.formatMessage({ id: 'passwordRecovery.title' })}</h2>
                <Form className='myform' onSubmit={recoverPassword}>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" 
                        placeholder={props.intl.formatMessage({ id: 'passwordRecovery.emailPlaceholder' })}
                        name='email'
                        value={objectForm.email}
                        onChange={handleChange} 
                    />
                    <Form.Text className="text-muted">
                        {props.intl.formatMessage({ id: 'passwordRecovery.phrase' })}
                    </Form.Text>
                </Form.Group>
                
                <Button className='mybutton' variant="primary" type="submit">
                    {props.intl.formatMessage({ id: 'passwordRecovery.title' })}
                </Button>

                <Button variant='warning' onClick={handleClearButton} className='mb-4' block>
                    {props.intl.formatMessage({ id: 'all.clear' })}
                </Button>
            </Form>
            <Card.Footer>
                <span className='text-muted'>{props.intl.formatMessage({ id: 'all.newAPP' })}</span> 
                &nbsp;
                <Link to='/signup'>{props.intl.formatMessage({ id: 'all.signUp' })}</Link>
            </Card.Footer>
            </Card>
        </div>
    );
}
const Passwordrecovery = injectIntl(PasswordRecovery);
export { Passwordrecovery };
// export default PasswordRecovery;