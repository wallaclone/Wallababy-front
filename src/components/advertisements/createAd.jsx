import React, { useState, useEffect } from 'react';

import { Form, Col, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import Swal from 'sweetalert2';

import apiCall from '../../api/api';

const { getTags, createAd } = apiCall();

function CreateAd(props) {
  const { setReloadAdvertisements } = props;
  const history = useHistory();

  const initialValues = {
    name: '',
    description: '',
    // image: '',
    image: null,
    status: '',
    price: 0,
    owner: '',
    tags: [],
  };

  const [objectForm, setObjectForm] = useState(initialValues);
  const [reloadTags, setReloadTags] = useState(true);
  // let arrayTags = [];

  useEffect(() => {
    if (reloadTags) {
      const loadTags = async () => {
        // realizamos la consulta al API
        const resultTags = await getTags();
        // console.log('resultAds:', resultAds.rows);
        // setObjectForm.tags( resultTags );

        setObjectForm({ ...objectForm, tags: resultTags });

        // resultTags.forEach(tag => {
        //     arrayTags.push({name:tag.name, status:false});
        // });
        // console.log("arrayTags:", arrayTags);
      };
      loadTags();

      // We change to false the recharge of articles so that it isn't recharging continuously
      setReloadTags(false);
    }
  }, [reloadTags, objectForm]);

  const handleChange = (event) => {
    if (event.target.type !== 'checkbox') {
      setObjectForm({
        ...objectForm,
        [event.target.name]: event.target.value,
      });
    } else { // if(event.target.type === 'checkbox') {
      setObjectForm({
        ...objectForm,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const returnToDashboard = () => {
    history.goBack();
  };

  // const returnToLogin = () => {
  //     //sessionStorage.clear();
  //     localStorage.clear();
  //     props.history.push(`/login`);
  // };

  const sendCreateAd = async (event) => {
    event.preventDefault();
    const {
      name, description, status, price, owner, tags,
    } = objectForm;
    const imgAux = document.getElementById('image-file').files[0];
    const myTags = [];

    tags.forEach((tag) => {
      // console.log(document.getElementById(tag.name).value, "->", document.getElementById(tag.name).checked)
      if (document.getElementById(tag.name).checked) myTags.push(document.getElementById(tag.name).value);
    });
    // console.log("myTags:", myTags);

    // const adCreated = await createAd (name, description, image, status, price, owner, myTags);
    const adCreated = await createAd(name, description, imgAux, status, price, owner, myTags);
    // console.log("adCreated.error", adCreated.error);

    if (adCreated.error === 'Error: Not logged in' || adCreated.error === 'Error: No token provided' || adCreated === 'No token provided') {
      Swal.fire({
        icon: 'error',
        title: 'Not logged in',
        text: 'You are not logged in, or your session has been expired. We redirect you to Log In to do it again.',
        timer: 5000,
        confirmButtonColor: '#1768ac',
      });
      history.push('/login');
    } else if (adCreated.error) {
      console.error('adCreated.error:', adCreated.error);
      Swal.fire({
        icon: 'error',
        title: 'Problems creating the advertisement',
        text: 'The advertisement could not be created (try again or later).',
        timer: 5000,
        confirmButtonColor: '#1768ac',
      });
    } else {
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'Correct advertisement',
        text: 'The advertisement was created successfully.',
        // footer: '<a href>Why do I have this issue?</a>',
        // showConfirmButton: false,
        timer: 10000,
        confirmButtonColor: '#1768ac',
      });
      // Redirect to dashboard (List of Advertisements)
      // this.props.history.push('/dashboard');
      setReloadAdvertisements(true);
      history.push('/dashboard');
    }
  };

  return (
    <div className="m-3">

      <h2 className="favs" style={{ marginTop: '6rem' }}><FormattedMessage id="createAd.title" value={(message) => ({ message })} /></h2>

      {/* <h1 className='titleName' style={{ marginTop: '6rem' }}><FormattedMessage id="createAd.title" value={(message) => ({message})} /></h1> */}

      <form encType="multipart/form-data" onSubmit={sendCreateAd}>

        <Form.Group controlId="formGridTitle">
          <Form.Label className="label"><FormattedMessage id="createAd.titleAd" value={(message) => ({ message })} /></Form.Label>
          <Form.Control
            type="text"
            name="name"
            maxLength="50"
            placeholder={props.intl.formatMessage({ id: 'createAd.titleAdPlaceholder' })}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Label className="label"><FormattedMessage id="createAd.tagsAd" value={(message) => ({ message })} /></Form.Label>
          {objectForm.tags.map((item) => (
            <Form.Check type="switch" name={item.name} id={item.name} key={item.name} value={item.name} label={item.name} onChange={handleChange} />
          ))}
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridMinPrice">
            <Form.Label className="label"><FormattedMessage id="createAd.typeAd" value={(message) => ({ message })} /></Form.Label>
            <Form.Control
              as="select"
              name="status"
              onChange={handleChange}
                            // value={this.state.venta}
              required
            >
              <option value="" defaultValue>{props.intl.formatMessage({ id: 'createAd.selectTypeAd' })}</option>
              <option value="true">{props.intl.formatMessage({ id: 'createAd.buy' })}</option>
              <option value="false">{props.intl.formatMessage({ id: 'createAd.sell' })}</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridMaxPrice">
            <Form.Label className="label"><FormattedMessage id="createAd.priceAd" value={(message) => ({ message })} /></Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder={props.intl.formatMessage({ id: 'createAd.priceAdPlaceholder' })}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridPhoto">
          <Form.Label className="label"><FormattedMessage id="createAd.uploadAd" value={(message) => ({ message })} /></Form.Label>
          <br />
          <input type="file" id="image-file" name="image" onChange={handleChange} accept="image/*" required />
        </Form.Group>

        <Form.Group controlId="formGridDescription">
          <Form.Label className="label"><FormattedMessage id="createAd.descriptionAd" value={(message) => ({ message })} /></Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows="3"
            maxLength="85"
            placeholder={props.intl.formatMessage({ id: 'createAd.descriptionAdPlaceholder' })}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} md="8" controlId="formGridCreateAd">
            <Button className="button" type="submit" variant="primary" size="lg" block>
              <FormattedMessage id="createAd.buttonCreateAd" value={(message) => ({ message })} />
            </Button>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="formGridReturnAds">
            <Button variant="warning" size="lg" block onClick={returnToDashboard}>
              <FormattedMessage id="createAd.buttonReturnAd" value={(message) => ({ message })} />
            </Button>
          </Form.Group>

          {/* <Form.Group as={Col} md="2" controlId="formGridLogOut">
                        <Button variant="danger" size="lg" block onClick={returnToLogin}>
                            Log Out
                        </Button>
                    </Form.Group> */}
        </Form.Row>
      </form>
    </div>
  );
}
const createAD = injectIntl(CreateAd);
export { createAD };
// export default CreateAd;
