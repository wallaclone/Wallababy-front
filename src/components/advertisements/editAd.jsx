import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { Form, Col, Button, Image }  from 'react-bootstrap';
import apiCall from '../api/api';
import Swal from 'sweetalert2';

const { getTags, editAdvert, getAd } = apiCall();

export default function EditAd(props) {
    //let advert = props.location.query;
    const id = props.match.params.id;
    const advertId = id.replace('id=', '');
    const BACK_IMAGE_PATH = 'http://localhost:3000/images/';
    const [advertForm, setAdvert] = useState({tags: ['undefined']});
    //console.log("advertReq", advertReq);
    
    /*const advert2 = await getAd(_id);
    console.log("el anuncio",advert2);*/
    /*const [objectForm, setObjectForm] = useState ({
        name: advert.name,
        description: advert.description,
        image: advert.image,
        status: advert.status,
        price: advert.price,
        tags: advert.tags
    });*/
    const [objectForm, setObjectForm] = useState ({
        name: '',
        description: '',
        image: '',
        status: '',
        price: '',
        tags: []
    });
    const [reloadAdvert, setReloadAdvert] = useState(true);
    const [reloadTags, setReloadTags] = useState(true);
    const history = useHistory();

    useEffect(() => {
        if (reloadAdvert) {
            const loadAdvert = async () => {
                const resultAdvert = await getAd(advertId);
                if (resultAdvert.result.tags.length < 1){
                    console.log("entro");
                    resultAdvert.result.tags = ['undefined'];
                }
                setAdvert(resultAdvert.result);
            }
            loadAdvert();
            setReloadAdvert(false);
        }
        if (reloadTags) {
            const loadTags = async () => {
                const resultTags = await getTags ();
                setObjectForm( { ...objectForm, tags : resultTags } );
            }
            loadTags();
            // We change to false the recharge of articles so that it isn't recharging continuously
            setReloadTags(false);
        }
    }, [ reloadTags, objectForm, reloadAdvert, advertForm, advertId ]);

    const returnToLogin = () => {
        localStorage.clear();
        props.history.push(`/login`);
    };

    const returnToDashboard = () => {
        history.goBack();
    };

    const sendEditAd = async (event) => {
        event.preventDefault();
        const id = props.match.params.id;
        const advertId = id.replace('id=', '');
        const advert = advertForm;
        const imgAux = document.getElementById('image-file').files[0];
        let myTags = [];
        advert.tags.forEach(tag => {
            if (advert.tags.includes(tag.name)){
                if(document.getElementById(tag.name).checked)
                    myTags.push(document.getElementById(tag.name).value);
            }
        });
        advert.tags = myTags;
        if(imgAux) {
            advert.image = imgAux;
        }
        const response = await editAdvert(advertId, advert);
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: `Correct update`,
                text: `The advertisement has been updated correctly.`,
                timer: 10000,
                confirmButtonColor:  '#E29578',
            });
            returnToDashboard();
        }
    }

    const handleChange = (event) => {
        if(event.target.type !== 'checkbox') {
            setObjectForm({
                ...objectForm,
                [event.target.name] : event.target.value
            });
        } else {
            setObjectForm({
                ...objectForm,
                [event.target.name] : event.target.checked,
            });
        }
    };

    return (
        <div className="m-3">
            <h1 className='titleName' style={{ marginTop: '6rem' }}>Edit Advertisement</h1>
            <form encType="multipart/form-data" onSubmit={sendEditAd}>
                <Form.Group controlId="formGridTitle">
                    <Form.Label className='label'>Title of the ad:</Form.Label>
                    <Form.Control type="text" 
                        name="name" 
                        maxLength="50"
                        placeholder="Add the title of the ad"
                        defaultValue={advertForm.name}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group controlId='formBasicCheckbox'> 
                    <Form.Label className='label'>Tags of the ad:</Form.Label>
                    {objectForm.tags.map(item => {
                        if (advertForm.tags[0].includes(item.name)){
                            return (
                                <Form.Check type="switch" name={item.name} id={item.name} key={item.name} value={item.name} label={item.name} onChange={handleChange} checked />
                            )
                        }else{
                            return (
                                <Form.Check type="switch" name={item.name} id={item.name} key={item.name} value={item.name} label={item.name} onChange={handleChange} />
                            )
                        }
                    })}
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridMinPrice">
                        <Form.Label className='label'>Type of ad:</Form.Label>
                        <Form.Control as="select" 
                            name="status"
                            onChange={handleChange}
                            required
                            >
                            <option value="">Select the type of ad (Buy/Sell)</option>
                            <option value="true" selected={advertForm.status === true}>Buy</option>
                            <option value="false" selected={advertForm.status === false}>Sell</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridMaxPrice">
                        <Form.Label className='label'>Price of the ad:</Form.Label>
                        <Form.Control type="number" 
                            name="price"
                            defaultValue={advertForm.price}
                            placeholder="Add the price of the ad" 
                            onChange={handleChange}
                            required />
                    </Form.Group>
                </Form.Row>

                <Form.Label className='label'>Current Image:</Form.Label>
                <br />
                <Image width="500" height="300" src={`${BACK_IMAGE_PATH}${advertForm.image}`} fluid />
                <Form.Group controlId="formGridPhoto">
                    <Form.Label className='label'>Search photo to upload:</Form.Label>
                    <br />
                    <input type='file' id='image-file' name='image' onChange={handleChange} accept='image/*'/>
                </Form.Group>
                <Form.Group controlId="formGridDescription">
                    <Form.Label className='label'>Description of the ad:</Form.Label>
                    <Form.Control as="textarea"
                        name="description"
                        rows="3"
                        maxLength="300"
                        placeholder="Add the description of the ad"
                        defaultValue={advertForm.description}
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} md="7" controlId="formGridCreateAd">
                        <Button type="submit" variant="primary" size="lg" block>
                            Edit advertisement
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