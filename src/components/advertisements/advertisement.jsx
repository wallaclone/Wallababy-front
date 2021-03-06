import React from 'react';

import { Button, Badge } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

function Advertisement(props) {
  const { advertisement } = props;
  const {
    _id,
    name,
    image,
    status,
    price,
    owner,
    tags,
    date_creation,
  } = advertisement;

  const BACK_IMAGE_PATH = 'http://localhost:3000/images/';

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
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

  const formatTags = (tags) => {
    let formatedTags = '';
    if (tags) {
      for (let i = 0; i < tags.length; i++) {
        if ((i + 1) < tags.length) {
          formatedTags += `${formatTag(tags[i])}, `;
        } else {
          formatedTags += `${formatTag(tags[i])}.`;
        }
      }
    }
    return formatedTags;
  };

  return (
    <div className="col mb-4" key={_id}>
      <div className="card h-100">
        <img src={`${BACK_IMAGE_PATH}${image}`} className="card-img-top" style={{ objectFit: 'cover', width: '100%', height: '50vh' }} alt={name} />

        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/seeAd/${_id}/${name}`} className="ad-name">{name}</Link>
          </h5>
          <p className="card-text">
            <strong>
              {props.intl.formatMessage({ id: 'advertisement.price' })}
              :
            </strong>
            {' '}
            {price}
            &euro;
          </p>
          <p className="card-text">
            <strong>
              {props.intl.formatMessage({ id: 'advertisement.type' })}
              :
            </strong>
&nbsp;
            {status ? props.intl.formatMessage({ id: 'advertisement.typeBuy' }) : props.intl.formatMessage({ id: 'advertisement.typeSell' })}
          </p>
          <p className="card-text">
            <strong>
              {props.intl.formatMessage({ id: 'advertisement.tags' })}
              :
            </strong>
            {' '}
            {formatTags(tags)}
          </p>

          <p className="card-text">
            <strong>
              {props.intl.formatMessage({ id: 'advertisement.owner' })}
              :
            </strong>
&nbsp;
            <Link className="forgot-pass" to={`/adsOwner/${owner}`}>{owner}</Link>
          </p>
          {advertisement.reserved === true && !advertisement.sold ? <Badge className="badge-reserved">{props.intl.formatMessage({ id: 'advertisement.reserved' })}</Badge> : null}
          {advertisement.sold === true ? <Badge variant="danger">{props.intl.formatMessage({ id: 'advertisement.sold' })}</Badge> : null}
        </div>

        <div className="card-footer text-center">
          <Link to={`/seeAd/${_id}/${name}`}>
            <Button variant="success" size="lg" className="mt-2 button" block>
              {props.intl.formatMessage({ id: 'advertisement.seeFullAd' })}
            </Button>
          </Link>
        </div>

        <div className="card-footer text-center">

          <small className="text-muted">
            {props.intl.formatMessage({ id: 'advertisement.createdAt' })}
            :
            {props.intl.formatDate(new Date(date_creation), dateOptions)}
          </small>
        </div>
      </div>
    </div>
  );
}
const advertisement = injectIntl(Advertisement);
export { advertisement };
