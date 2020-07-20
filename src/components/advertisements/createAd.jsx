import React, { useState, useEffect, useContext } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import Swal from 'sweetalert2';
import apiCall from '../../api/api';
import { AuthContext } from '../../contexts/authContext';

const { isNotLogin, getTags, createAd } = apiCall();

function CreateAd(props) {

    const { setReloadAdvertisements } = props;
    const history = useHistory();
    const { user } = useContext(AuthContext);

    if( isNotLogin( user, props.intl.formatMessage({ id: 'createAd.notLoggedIn' }), props.intl.formatMessage({ id: 'createAd.youAreNotLoggedIn' }) ) ) { history.push('/login'); }

    const initialValues = {
        name: '',
        description: '',
        image: null,
        status: '',
        price: 0,
        owner: '',
        tags: [],
    };

    const [ objectForm, setObjectForm ] = useState (initialValues);
    const [ reloadTags, setReloadTags ] = useState( true );

    useEffect(() => {
        if( reloadTags ){
        const loadTags = async () => {
            const resultTags = await getTags ();
            setObjectForm( { ...objectForm, tags : resultTags } );
        }
        loadTags();
        // We change to false the recharge of articles so that it isn't recharging continuously
        setReloadTags( false );
        }
    }, [ reloadTags, objectForm ]);

    const handleChange = (event) => {
        if(event.target.type !== 'checkbox') {
            setObjectForm({
                ...objectForm,
                [event.target.name] : event.target.value
            });
        } else { //if(event.target.type === 'checkbox') {
            setObjectForm({
                ...objectForm,
                [event.target.name] : event.target.checked,
            });
        }
    };

    const returnToDashboard = () => {
        history.goBack();
    };

    const sendCreateAd = async (event) => {
        event.preventDefault();
        const { name, description, status, price, owner, tags } = objectForm;
        const imgAux = document.getElementById('image-file').files[0];
        let myTags = [];

        tags.forEach(tag => {
            if(document.getElementById(tag.name).checked)
                myTags.push(document.getElementById(tag.name).value);
        });
        
        //const adCreated = await createAd (name, description, image, status, price, owner, myTags);
        const adCreated = await createAd (name, description, imgAux, status, price, owner, myTags);

        if (adCreated.error === 'Error: Not logged in' || adCreated.error === 'Error: No token provided' || adCreated === 'No token provided') {
            Swal.fire({
                icon: 'error',
                title: props.intl.formatMessage({ id: 'createAd.notLoggedIn' }),
                text: props.intl.formatMessage({ id: 'createAd.youAreNotLoggedIn' }),
                timer: 5000,
                confirmButtonColor:  '#1768ac',
            });
            history.push('/login');
        } else if (adCreated.error) {
            console.error("adCreated.error:", adCreated.error);
            Swal.fire({
                icon: 'error',
                title: props.intl.formatMessage({ id: 'createAd.problemsCreatingAd' }),
                text: props.intl.formatMessage({ id: 'createAd.tryAgainOrLater' }),
                timer: 5000,
                confirmButtonColor:  '#1768ac',
            });
        } else {
            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: props.intl.formatMessage({ id: 'createAd.correctAdvertisement' }),
                text: props.intl.formatMessage({ id: 'createAd.adCreatedSuccessfully' }),
                //footer: '<a href>Why do I have this issue?</a>',
                //showConfirmButton: false,
                timer: 10000,
                confirmButtonColor:  '#1768ac',
            });
            // Redirect to dashboard (List of Advertisements)
            setReloadAdvertisements(true);
            history.push('/dashboard');
        }
    };

    const formatTag = (tag) => {
        if(tag !== undefined && tag !== null && tag !== '') {
          switch (tag) {
            case 'Comfort':
              return props.intl.formatMessage({ id: 'tag.comfort' });
            case 'Educational':
              return props.intl.formatMessage({ id: 'tag.educational' });
            case 'Accessories':
              return props.intl.formatMessage({ id: 'tag.accessories' });
            case 'Promotions':
              return props.intl.formatMessage({ id: 'tag.promotions' });
            case 'Food':
              return props.intl.formatMessage({ id: 'tag.food' });
            case 'Furniture':
              return props.intl.formatMessage({ id: 'tag.furniture' });
            case 'Security':
              return props.intl.formatMessage({ id: 'tag.security' });
            case 'Entertainment':
              return props.intl.formatMessage({ id: 'tag.entertainment' });
            case 'Toys':
              return props.intl.formatMessage({ id: 'tag.toys' });
            case 'Costume':
              return props.intl.formatMessage({ id: 'tag.costume' });
            case 'Hobby':
              return props.intl.formatMessage({ id: 'tag.hobby' });
            case 'Clothes':
              return props.intl.formatMessage({ id: 'tag.clothes' });
            case 'Footwear':
              return props.intl.formatMessage({ id: 'tag.footwear' });
            default:
              return tag;
          }
        }
        return '';
    };

    return (
        <div className="m-3">

            <h2 className='favs' style={{ marginTop: '6rem' }}><FormattedMessage id="createAd.title" value={(message) => ({message})} /></h2>

            {/* <h1 className='titleName' style={{ marginTop: '6rem' }}><FormattedMessage id="createAd.title" value={(message) => ({message})} /></h1> */}

            <form encType="multipart/form-data" onSubmit={sendCreateAd}>

                <Form.Group controlId="formGridTitle">
                    <Form.Label className='label'><FormattedMessage id="createAd.titleAd" value={(message) => ({message})}/></Form.Label>
                    <Form.Control type="text" 
                        name="name" 
                        maxLength="50"
                        placeholder={props.intl.formatMessage({ id: 'createAd.titleAdPlaceholder' })} 
                        onChange={handleChange}
                        required />
                </Form.Group>

                <Form.Group controlId='formBasicCheckbox'> 
                    <Form.Label className='label'><FormattedMessage id="createAd.tagsAd" value={(message) => ({message})}/></Form.Label>
                    {objectForm.tags.map(item => {
                        return (
                            <Form.Check type="switch" name={item.name} id={item.name} key={item.name} value={item.name} label={formatTag(item.name)} onChange={handleChange} />
                        )
                    })}
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridMinPrice">
                        <Form.Label className='label'><FormattedMessage id="createAd.typeAd" value={(message) => ({message})}/></Form.Label>
                        <Form.Control as="select" 
                            name="status"
                            onChange={handleChange}
                            // value={this.state.venta} 
                            required>
                            <option value="" defaultValue>{props.intl.formatMessage({ id: 'createAd.selectTypeAd' })}</option>
                            <option value="true">{props.intl.formatMessage({ id: 'createAd.buy' })}</option>
                            <option value="false">{props.intl.formatMessage({ id: 'createAd.sell' })}</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMaxPrice">
                        <Form.Label className='label'><FormattedMessage id="createAd.priceAd" value={(message) => ({message})}/></Form.Label>
                        <Form.Control type="number" 
                            name="price" 
                            placeholder={props.intl.formatMessage({ id: 'createAd.priceAdPlaceholder' })} 
                            onChange={handleChange}
                            required />
                    </Form.Group>
                </Form.Row>
                
                <Form.Group controlId="formGridPhoto">
                    <Form.Label className='label'><FormattedMessage id="createAd.uploadAd" value={(message) => ({message})}/></Form.Label>
                    <br />
                    <input type='file' id='image-file' name='image' onChange={handleChange} accept='image/*' required />
                </Form.Group>

                <Form.Group controlId="formGridDescription">
                    <Form.Label className='label'><FormattedMessage id="createAd.descriptionAd" value={(message) => ({message})}/></Form.Label>
                    <Form.Control as="textarea" 
                        name="description"
                        rows="3"
                        maxLength="85"
                        placeholder={props.intl.formatMessage({ id: 'createAd.descriptionAdPlaceholder' })}  
                        onChange={handleChange}
                        required />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="8" controlId="formGridCreateAd">
                        <Button className='button' type="submit" variant="primary" size="lg" block>
                            <FormattedMessage id="createAd.buttonCreateAd" value={(message) => ({message})}/>
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="formGridReturnAds">
                        <Button variant="warning" size="lg" block onClick={returnToDashboard}>
                            <FormattedMessage id="createAd.buttonReturnAd" value={(message) => ({message})}/>
                        </Button>
                    </Form.Group>
                </Form.Row>
            </form>
        </div>
    )
}
const createAD = injectIntl(CreateAd);
export { createAD };
// export default CreateAd;