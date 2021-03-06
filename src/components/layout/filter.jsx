import React, { useState } from 'react';

import { Form, Col, Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';

function Filter(props) {
  const {
    setSearch, setReloadAdvertisements, setCurrentPage, tags,
  } = props;

  const initialValues = () => ({
    name: sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '',
    minPrice: sessionStorage.getItem('minPrice') ? sessionStorage.getItem('minPrice') : '',
    maxPrice: sessionStorage.getItem('maxPrice') ? sessionStorage.getItem('maxPrice') : '',
    status: sessionStorage.getItem('status') ? sessionStorage.getItem('status') : '',
    tag: sessionStorage.getItem('tag') ? sessionStorage.getItem('tag') : '',
  });

  const [valuesSearch, setValuesSearch] = useState(initialValues());

  const handleChange = (event) => {
    setValuesSearch({
      ...valuesSearch,
      [event.target.name]: event.target.value,
    });
    sessionStorage.setItem(event.target.name, event.target.value);
  };

  const clearFilter = () => {
    sessionStorage.clear();

    setReloadAdvertisements(true);
    setSearch('');
    setCurrentPage(1);
    setValuesSearch(initialValues());
  };

  const buscarAnuncio = async (event) => {
    event.preventDefault();
    const {
      name, minPrice, maxPrice, status, tag,
    } = valuesSearch;
    let queryParams = '';
    queryParams = name !== '' ? queryParams += `&name=${name}` : queryParams += '';
    queryParams = status !== '' ? queryParams += `&status=${status}` : queryParams += '';
    queryParams = tag ? queryParams += `&tags=${tag}` : queryParams += '';
    if (minPrice && maxPrice) {
      queryParams = queryParams += `&price=${minPrice}-${maxPrice}`;
    } else if (minPrice || maxPrice) {
      queryParams = queryParams += `&price=${minPrice}-${maxPrice}`;
    }

    setCurrentPage(1);
    setReloadAdvertisements(true);
    setSearch(queryParams);
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
    <form onSubmit={buscarAnuncio}>
      <Form.Group className="ml-3 mr-3">

        <Form.Row>
          <Form.Group as={Col} md="12">
            <Form.Label className="label">{props.intl.formatMessage({ id: 'filter.whatAreYouLookingFor' })}</Form.Label>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Control
              type="text"
              placeholder={props.intl.formatMessage({ id: 'filter.whatAreYouLookingForPlaceholder' })}
              name="name"
              id="name"
              onChange={handleChange}
              value={valuesSearch.name}
            />
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Control
              as="select"
              name="tag"
              id="tag"
              onChange={handleChange}
              value={valuesSearch.tag}
            >
              <option value="" defaultValue>{props.intl.formatMessage({ id: 'filter.selectTag' })}</option>
              {tags.map((itemTag) => (
                <option key={itemTag} value={itemTag}>{formatTag(itemTag)}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Control
              as="select"
              name="status"
              id="status"
              onChange={handleChange}
              value={valuesSearch.status}
            >
              <option value="" defaultValue>{props.intl.formatMessage({ id: 'filter.selectStatus' })}</option>
              <option value="true">{props.intl.formatMessage({ id: 'createAd.buy' })}</option>
              <option value="false">{props.intl.formatMessage({ id: 'createAd.sell' })}</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              type="number"
              placeholder={props.intl.formatMessage({ id: 'filter.minimalPricePlaceholder' })}
              onChange={handleChange}
              name="minPrice"
              id="minPrice"
              value={valuesSearch.minPrice}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Control
              type="number"
              placeholder={props.intl.formatMessage({ id: 'filter.maximumPricePlaceholder' })}
              onChange={handleChange}
              name="maxPrice"
              id="maxPrice"
              value={valuesSearch.maxPrice}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="8">
            <Button className="button" type="submit" variant="primary" size="lg" block>
              {props.intl.formatMessage({ id: 'filter.searchAds' })}
            </Button>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Button variant="secondary" size="lg" block onClick={clearFilter}>
              {props.intl.formatMessage({ id: 'filter.clearFilter' })}
            </Button>
          </Form.Group>
        </Form.Row>

      </Form.Group>
    </form>
  );
}
const filter = injectIntl(Filter);
export { filter };
