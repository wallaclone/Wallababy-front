import React, { useState, useEffect } from 'react';

import { Form, Col, Button, Image } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import apiCall from '../../api/api';

const { getTags, editAdvert, getAd } = apiCall();

function EditAd() {
  // const id = props.match.params.id;
  const { id } = useParams();
  console.log('id', id);
  const advertId = id.replace('id=', '');
  const BACK_IMAGE_PATH = 'http://localhost:3000/images/';
  const [advertForm, setAdvert] = useState({ tags: ['undefined'] });
  const [objectForm, setObjectForm] = useState({
    name: '',
    description: '',
    image: '',
    status: '',
    price: '',
    tags: [],
  });
  const [reloadAdvert, setReloadAdvert] = useState(true);
  const [reloadTags, setReloadTags] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (reloadAdvert) {
      const loadAdvert = async () => {
        const resultAdvert = await getAd(advertId);
        if (resultAdvert.result.tags.length < 1) {
          console.log('entro');
          resultAdvert.result.tags = ['undefined'];
        }
        setAdvert(resultAdvert.result);
      };
      loadAdvert();
      setReloadAdvert(false);
    }
    if (reloadTags) {
      const loadTags = async () => {
        const resultTags = await getTags();
        setObjectForm({ ...objectForm, tags: resultTags });
      };
      loadTags();
      // We change to false the recharge of articles so that it isn't recharging continuously
      setReloadTags(false);
    }
  }, [reloadTags, objectForm, reloadAdvert, advertForm, advertId]);

  const returnToLogin = () => {
    localStorage.clear();
    // props.history.push(`/login`);
  };

  const returnToDashboard = () => {
    history.goBack();
  };

  const sendEditAd = async (event) => {
    event.preventDefault();
    // const id = props.match.params.id;
    // const advertId = id.replace('id=', '');
    const advert = objectForm;
    advert.owner = advertForm.owner;
    const imgAux = document.getElementById('image-file').files[0];
    const myTags = [];
    advert.tags.forEach((tag) => {
      if (document.getElementById(tag.name).checked) {
        myTags.push(document.getElementById(tag.name).value);
      }
      /* if (advertForm.tags[0].includes(tag.name)){
                console.log("primero");

            } */
    });
    advert.image = advertForm.image;
    console.log('myTags', myTags);
    advert.tags = myTags;
    if (!advert.price) {
      advert.price = advertForm.price;
    }
    if (!advert.name) {
      advert.name = advertForm.name;
    }
    if (!advert.description) {
      advert.description = advertForm.description;
    }
    if (!advert.status) {
      advert.status = advertForm.status;
    }
    if (imgAux) {
      advert.image = imgAux;
    }
    const response = await editAdvert(advertId, advert);
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Correct update',
        text: 'The advertisement has been updated correctly.',
        timer: 10000,
        confirmButtonColor: '#E29578',
      });
      returnToDashboard();
    }
  };

  const handleChange = (event) => {
    if (event.target.type !== 'checkbox') {
      setObjectForm({
        ...objectForm,
        [event.target.name]: event.target.value,
      });
    } else {
      setObjectForm({
        ...objectForm,
        [event.target.name]: event.target.checked,
      });
    }
  };

  return (
    <div className="m-3">
      <h2 className="titleName" style={{ marginTop: '6rem' }}>Edit Advertisement:</h2>
      <form encType="multipart/form-data" onSubmit={sendEditAd}>
        <Form.Group controlId="formGridTitle">
          <Form.Label className="label">Title of the ad:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            maxLength="50"
            placeholder="Add the title of the ad"
            defaultValue={advertForm.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Label className="label">Tags of the ad:</Form.Label>
          {objectForm.tags.map((item) => {
            if (advertForm.tags[0].includes(item.name)) {
              return (
                <Form.Check type="switch" name={item.name} id={item.name} key={item.name} value={item.name} label={item.name} onChange={handleChange} defaultChecked />
              );
            }
            return (
              <Form.Check type="switch" name={item.name} id={item.name} key={item.name} value={item.name} label={item.name} onChange={handleChange} />
            );
          })}
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridMinPrice">
            <Form.Label className="label">Type of ad:</Form.Label>
            <Form.Control
              as="select"
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
            <Form.Label className="label">Price of the ad:</Form.Label>
            <Form.Control
              type="number"
              name="price"
              defaultValue={advertForm.price}
              placeholder="Add the price of the ad"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Label className="label">Current Image:</Form.Label>
        <br />
        <Image width="500" height="300" src={`${BACK_IMAGE_PATH}${advertForm.image}`} fluid />
        <Form.Group controlId="formGridPhoto">
          <Form.Label className="label">Search photo to upload:</Form.Label>
          <br />
          <input type="file" id="image-file" name="image" onChange={handleChange} accept="image/*" />
        </Form.Group>
        <Form.Group controlId="formGridDescription">
          <Form.Label className="label">Description of the ad:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows="3"
            maxLength="300"
            placeholder="Add the description of the ad"
            defaultValue={advertForm.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCreateAd">
            <Button className="button" type="submit" variant="primary" size="lg" block>
              Edit advertisement
            </Button>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridReturnAds">
            <Button variant="warning" size="lg" block onClick={returnToDashboard}>
              Return to Ads
            </Button>
          </Form.Group>

        </Form.Row>
      </form>
    </div>
  );
}

const Editad = injectIntl(EditAd);
export { Editad };
