import React, { useState } from 'react';

import { Form, Col, Button } from 'react-bootstrap';
// import { Link, useHistory } from "react-router-dom";
import { injectIntl } from 'react-intl';

function Filter(props) {
  const {
    setSearch, setReloadAdvertisements, setCurrentPage, tags,
  } = props;
  // const history = useHistory();

  const initialValues = {
    name: '',
    minPrice: '',
    maxPrice: '',
    status: '',
    tag: '',

    name: sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '',
    minPrice: sessionStorage.getItem('minPrice') ? sessionStorage.getItem('minPrice') : '',
    maxPrice: sessionStorage.getItem('maxPrice') ? sessionStorage.getItem('maxPrice') : '',
    status: sessionStorage.getItem('status') ? sessionStorage.getItem('status') : '',
    tag: sessionStorage.getItem('tag') ? sessionStorage.getItem('tag') : '',
  };

  const [valuesSearch, setValuesSearch] = useState(initialValues);

  const handleChange = (event) => {
    setValuesSearch({
      ...valuesSearch,
      [event.target.name]: event.target.value,
    });
    sessionStorage.setItem(event.target.name, event.target.value);
  };

  const clearFilter = () => {
    sessionStorage.clear();
    setValuesSearch(initialValues);

    let element = document.getElementById('name');
    element.value = '';
    element = document.getElementById('tag');
    element.value = '';
    element = document.getElementById('status');
    element.value = '';
    element = document.getElementById('minPrice');
    element.value = '';
    element = document.getElementById('maxPrice');
    element.value = '';

    sessionStorage.clear();

    setReloadAdvertisements(true);
    setSearch('');
    setCurrentPage(1);

    // history.push('/dashboard');
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
      // queryParams = (!minPrice && maxPrice) ? queryParams += `&price=0-${maxPrice}` : queryParams += `&price=${minPrice}-999999999999999999999999999999999999`;
      queryParams = queryParams += `&price=${minPrice}-${maxPrice}`;
    }

    setCurrentPage(1);
    setReloadAdvertisements(true);
    setSearch(queryParams);
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
            {/* <Form.Label className='label'>{props.intl.formatMessage({ id: 'filter.whatAreYouLookingFor' })}</Form.Label> */}
            <Form.Control
              type="text"
              placeholder={props.intl.formatMessage({ id: 'filter.whatAreYouLookingForPlaceholder' })}
              name="name"
              id="name"
              onChange={handleChange}
                        // onChange={(e) => setValuesSearch(e.target.value)}
              value={sessionStorage.getItem('name')}
            />
          </Form.Group>

          <Form.Group as={Col} md="3">
            {/* <Form.Label>&nbsp;</Form.Label> */}
            <Form.Control
              as="select"
              name="tag"
              id="tag"
              onChange={handleChange}
              value={sessionStorage.getItem('tag')}
            >
              <option value="" defaultValue>{props.intl.formatMessage({ id: 'filter.selectTag' })}</option>
              {tags.map((itemTag) => (
                <option key={itemTag} value={itemTag}>{itemTag}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} md="3">
            {/* <Form.Label>&nbsp;</Form.Label> */}
            <Form.Control
              as="select"
              name="status"
              id="status"
              onChange={handleChange}
              value={sessionStorage.getItem('status')}
            >
              <option value="" defaultValue>{props.intl.formatMessage({ id: 'filter.selectStatus' })}</option>
              <option value="true">{props.intl.formatMessage({ id: 'createAd.buy' })}</option>
              <option value="false">{props.intl.formatMessage({ id: 'createAd.sell' })}</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            {/* <Form.Label className='label'>{props.intl.formatMessage({ id: 'filter.minimalPrice' })}</Form.Label> */}
            <Form.Control
              type="number"
              placeholder={props.intl.formatMessage({ id: 'filter.minimalPricePlaceholder' })}
              onChange={handleChange}
              name="minPrice"
              id="minPrice"
              value={sessionStorage.getItem('minPrice')}
            />
          </Form.Group>

          <Form.Group as={Col}>
            {/* <Form.Label className='label'>{props.intl.formatMessage({ id: 'filter.maximumPrice' })}</Form.Label> */}
            <Form.Control
              type="number"
              placeholder={props.intl.formatMessage({ id: 'filter.maximumPricePlaceholder' })}
              onChange={handleChange}
              name="maxPrice"
              id="maxPrice"
              value={sessionStorage.getItem('maxPrice')}
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
            <Button variant="warning" size="lg" block onClick={clearFilter}>
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
// export default Filter;
