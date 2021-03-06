import React, { useState, useEffect, useContext } from 'react';

import { Form, Col, Button, Image } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import apiCall from '../../api/api';
import { AuthContext } from '../../contexts/authContext';

const {
  isNotLogin, getTags, editAdvert, getAd,
} = apiCall();

function EditAd(props) {
  const { id } = useParams();
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
  const { user } = useContext(AuthContext);

  if (isNotLogin(user, props.intl.formatMessage({ id: 'createAd.notLoggedIn' }), props.intl.formatMessage({ id: 'createAd.youAreNotLoggedIn' }))) { history.push('/login'); }

  useEffect(() => {
    if (reloadAdvert) {
      const loadAdvert = async () => {
        const resultAdvert = await getAd(advertId);
        if (resultAdvert.result.tags.length < 1) {
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

  const returnToDashboard = () => {
    history.goBack();
  };

  const returnToSeeAd = (advertName) => {
    const splitID = id.split('='); // id: "id=5f15bc96980ea33e809e5fc2"
    history.push(`/seeAd/${splitID[1]}/${advertName}`); // http://localhost:3001/seeAd/5f15bc96980ea33e809e5fc2/Aston
  };

  const sendEditAd = async (event) => {
    event.preventDefault();
    const advert = objectForm;
    advert.owner = advertForm.owner;
    const imgAux = document.getElementById('image-file').files[0];
    const myTags = [];
    advert.tags.forEach((tag) => {
      if (document.getElementById(tag.name).checked) {
        myTags.push(document.getElementById(tag.name).value);
      }
    });
    advert.image = advertForm.image;
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
        title: props.intl.formatMessage({ id: 'sweetalert.correctUpdate' }),
        text: props.intl.formatMessage({ id: 'sweetalert.advertisementUpdated' }),
        timer: 10000,
        confirmButtonColor: '#E29578',
      });
      returnToSeeAd(advert.name);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: props.intl.formatMessage({ id: 'sweetalert.errorUpdating' }),
        timer: 10000,
        confirmButtonColor: '#1768ac',
      });
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

  const formatTag = (tag) => {
    if (tag !== undefined && tag !== null && tag !== '') {
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
      <h2 className="titles">{props.intl.formatMessage({ id: 'editAd.editAdvertisement' })}</h2>
      <form encType="multipart/form-data" onSubmit={sendEditAd}>
        <Form.Group controlId="formGridTitle">
          <Form.Label className="label">{props.intl.formatMessage({ id: 'createAd.titleAd' })}</Form.Label>
          <Form.Control
            type="text"
            name="name"
            maxLength="50"
            placeholder={props.intl.formatMessage({ id: 'createAd.titleAdPlaceholder' })}
            defaultValue={advertForm.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          {console.log('advertForm.tags:', advertForm.tags)}
          <Form.Label className="label">{props.intl.formatMessage({ id: 'createAd.tagsAd' })}</Form.Label>
          {objectForm.tags.map((item) => {
            let isChecked = false;
            for (let index = 0; index < advertForm.tags.length; index++) {
              if (advertForm.tags[index].includes(item.name)) {
                isChecked = true;
              }
            }
            if (isChecked) { 
              return (
                <Form.Check type="switch" name={item.name} id={item.name} key={item.name} value={item.name} label={formatTag(item.name)} onChange={handleChange} defaultChecked />
              );
            }
            return (
              <Form.Check type="switch" name={item.name} id={item.name} key={item.name} value={item.name} label={formatTag(item.name)} onChange={handleChange} />
            );
          })}
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridMinPrice">
            <Form.Label className="label">{props.intl.formatMessage({ id: 'createAd.typeAd' })}</Form.Label>
            <Form.Control
              as="select"
              name="status"
              onChange={handleChange}
              required
            >
              <option value="">{props.intl.formatMessage({ id: 'createAd.selectTypeAd' })}</option>
              <option value="true" selected={advertForm.status === true}>{props.intl.formatMessage({ id: 'createAd.buy' })}</option>
              <option value="false" selected={advertForm.status === false}>{props.intl.formatMessage({ id: 'createAd.sell' })}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridMaxPrice">
            <Form.Label className="label">{props.intl.formatMessage({ id: 'createAd.priceAd' })}</Form.Label>
            <Form.Control
              type="number"
              name="price"
              defaultValue={advertForm.price}
              placeholder={props.intl.formatMessage({ id: 'createAd.priceAdPlaceholder' })}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Label className="label">
          {props.intl.formatMessage({ id: 'editAd.currentImage' })}
          :
        </Form.Label>
        <br />
        <Image width="500" height="300" src={`${BACK_IMAGE_PATH}${advertForm.image}`} fluid />
        <Form.Group controlId="formGridPhoto">
          <Form.Label className="label">{props.intl.formatMessage({ id: 'createAd.uploadAd' })}</Form.Label>
          <br />
          <input type="file" id="image-file" name="image" onChange={handleChange} accept="image/*" />
        </Form.Group>
        <Form.Group controlId="formGridDescription">
          <Form.Label className="label">{props.intl.formatMessage({ id: 'createAd.descriptionAd' })}</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows="3"
            maxLength="300"
            placeholder={props.intl.formatMessage({ id: 'createAd.descriptionAdPlaceholder' })}
            defaultValue={advertForm.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCreateAd">
            <Button className="button" type="submit" variant="primary" size="lg" block>
              {props.intl.formatMessage({ id: 'editAd.editAdvertisement' })}
            </Button>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridReturnAds">
            <Button variant="warning" size="lg" block onClick={returnToDashboard}>
              {props.intl.formatMessage({ id: 'createAd.buttonReturnAd' })}
            </Button>
          </Form.Group>

        </Form.Row>
      </form>
    </div>
  );
}
const Editad = injectIntl(EditAd);
export { Editad };
