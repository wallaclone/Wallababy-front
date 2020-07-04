import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
//import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { Form, Col, Button }  from 'react-bootstrap';
import apiCall from '../api/api';
import Swal from 'sweetalert2';

const { createAd } = apiCall();

function CreateAd(props) {

    const history = useHistory();

    const initialValues = {
        name: '',
        description: '',
        // image: '',
        image: null,
        status: '',
        price: 0,
        owner: '',
        // tags: [],
        tag1: false,
        tag2: false,
        tag3: false,
        tag4: false,
    };

    const [ objectForm, setObjectForm ] = useState (initialValues);

    const handleChange = (event) => {
        setObjectForm({
            ...objectForm,
            [event.target.name] : event.target.value,
        });

        const name = event.target.name;
        if(name==='tag1' || name==='tag2' || name==='tag3' || name==='tag4') {
            setObjectForm({
                ...objectForm,
                [name] : event.target.checked,
            });
        }
    };

    // const handleClearButton = () => {
    //     setObjectForm({
    //         email : '',
    //     });
    // };

    const returnToDashboard = () => {
        history.goBack();
    };
    
    const returnToLogin = () => {
        //sessionStorage.clear();
        localStorage.clear();
        props.history.push(`/login`);
    };

    const sendCreateAd = async (event) => {
        event.preventDefault();
        const { name, description, status, price, owner, tag1, tag2, tag3, tag4 } = objectForm;

        const imgAux = document.getElementById('image-file').files[0];

        // console.log('imgAux:', imgAux);
        // console.log('image:', image);

        let myTags = [];
        if (tag1)
            myTags.push('tag1');
        if (tag2)
            myTags.push('tag2');
        if (tag3)
            myTags.push('tag3');
        if (tag4)
            myTags.push('tag4');
        
        //const adCreated = await createAd (name, description, image, status, price, owner, myTags);
        const adCreated = await createAd (name, description, imgAux, status, price, owner, myTags);

        // console.log("adCreated.error", adCreated.error);

        if (adCreated.error === 'Error: Not logged in' || adCreated.error === 'Error: No token provided' || adCreated === 'No token provided') {
            Swal.fire({
                icon: 'error',
                title: 'Not logged in',
                text: `You are not logged in, or your session has been expired. We redirect you to Log In to do it again.`,
                timer: 5000,
                confirmButtonColor:  '#E29578',
            });
            // this.props.history.push('/login');
        } else if (adCreated.error) {
            console.error("adCreated.error:", adCreated.error);
            Swal.fire({
                icon: 'error',
                title: 'Problems creating the advertisement',
                text: `The advertisement could not be created (try again or later).`,
                timer: 5000,
                confirmButtonColor:  '#E29578',
            });
        } else {
            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: `Correct advertisement`,
                text: `The advertisement was created successfully.`,
                //footer: '<a href>Why do I have this issue?</a>',
                //showConfirmButton: false,
                timer: 10000,
                confirmButtonColor:  '#E29578',
            });
            // this.props.history.push('/dashboard?');
        }
    };

    return (
        <div class="m-3">

            {/* <Navbarr /> */}
            <h1 className='titleName'>Create Advertisement</h1>

            {/* <form encType='multipart/form-data' onSubmit={sendCreateAd}> */}
            <form enctype="multipart/form-data" onSubmit={sendCreateAd}>

                <Form.Group controlId="formGridTitle">
                    <Form.Label className='label'>Title of the ad:</Form.Label>
                    <Form.Control type="text" 
                        name="name" 
                        maxLength="50"
                        placeholder="Add the title of the ad" 
                        onChange={handleChange}
                        required />
                </Form.Group>

                <Form.Group controlId='formBasicCheckbox'> 
                    <Form.Label className='label'>Tags of the ad:</Form.Label>
                    <Form.Check type='switch' name='tag1' id='tag1' key='tag1' value='tag1' label='tag1' onChange={handleChange} />
                    <Form.Check type='switch' name='tag2' id='tag2' key='tag2' value='tag2' label='tag2' onChange={handleChange} />
                    <Form.Check type='switch' name='tag3' id='tag3' key='tag3' value='tag3' label='tag3' onChange={handleChange} />
                    <Form.Check type='switch' name='tag4' id='tag4' key='tag4' value='tag4' label='tag4' onChange={handleChange} />
                    {/* {this.state.optionsTag.map(item => {
                        if (item !== null) {
                            return (
                                <Form.Check type="switch" name={item} id={item} key={item} value={item} label={item} onChange={this.handleChange} />
                            )
                        }
                    })} */}
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridMinPrice">
                        <Form.Label className='label'>Type of ad:</Form.Label>
                        <Form.Control as="select" 
                            name="status"
                            onChange={handleChange}
                            // value={this.state.venta} 
                            required>
                            <option value="" defaultValue>Select the type of ad (Buy/Sell)</option>
                            <option value="true">Buy</option>
                            <option value="false">Sell</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMaxPrice">
                        <Form.Label className='label'>Price of the ad:</Form.Label>
                        <Form.Control type="number" 
                            name="price" 
                            placeholder="Add the price of the ad" 
                            onChange={handleChange}
                            required />
                    </Form.Group>
                </Form.Row>
                
                <Form.Group controlId="formGridPhoto">
                    <Form.Label className='label'>Search photo to upload:</Form.Label>
                    {/* <Form.Control type="text" 
                        name="photo" 
                        maxLength="120"
                        placeholder="Add the link to the ad photo" 
                        // onChange={handleChange}
                        required /> */}
                    
                    {/* <Form.File 
                        id='image'
                        name='image'
                        // label='Search photo to upload'
                        label=''
                        onChange={handleChange}
                        custom
                    /> */}

                    <input type='file' id='image-file' name='image' onChange={handleChange} accept='image/*' required />

                    {/* <Form.Control type="file" 
                        name="image"
                        onChange={handleChange}
                        required /> */}
                        
                    {/* <input type="file" id="myfile" name="myfile" enctype="multipart/form-data"></input> */}
                </Form.Group>

                <Form.Group controlId="formGridDescription">
                    <Form.Label className='label'>Description of the ad:</Form.Label>
                    <Form.Control as="textarea" 
                        name="description"
                        rows="3"
                        maxLength="85"
                        placeholder="Add the description of the ad"
                        onChange={handleChange}
                        required />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="7" controlId="formGridCreateAd">
                        <Button type="submit" variant="primary" size="lg" block>
                            Create advertisement
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="formGridReturnAds">
                        <Button variant="warning" size="lg" block onClick={returnToDashboard}>
                            Return to Ads 
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="formGridLogOut">
                        <Button variant="danger" size="lg" block onClick={returnToLogin}>
                            Log Out
                        </Button>
                    </Form.Group>
                </Form.Row>
            </form>
        </div>
    )
}
export default CreateAd;