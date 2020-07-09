import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, FormattedDate, FormattedTime, FormattedRelativeTime } from 'react-intl';
import apiCall from '../api/api';

const { getTags } = apiCall();

function Filter(props) {
    const { guardarBusqueda, setReloadAdvertisements, tags } = props;
    const history = useHistory();

    //console.log('*TAGS:', tags);

    const initialValues = {
        name: sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '',
        minPrice: sessionStorage.getItem('minPrice') ? sessionStorage.getItem('minPrice') : '',
        maxPrice: sessionStorage.getItem('maxPrice') ? sessionStorage.getItem('maxPrice') : '',
        status: sessionStorage.getItem('status') ? sessionStorage.getItem('status') : '',
        tag: sessionStorage.getItem('tag') ? sessionStorage.getItem('tag') : '',

        // name: '',
        // minPrice: '',
        // maxPrice: '',
        // status: '',
        // tag: '',

        // //tags: [],
    };

    // const [ reloadTags, setReloadTags ] = useState( true );
    const [ terminoBusqueda, guardarTerminoBusqueda ] = useState (initialValues);
    // const [terminoBusqueda, guardarTerminoBusqueda] = useState ('');
    //const [error, guardarError] = useState(false); //4

    const handleChange = (event) => {
        guardarTerminoBusqueda({
            ...terminoBusqueda,
            [event.target.name] : event.target.value,
        });
        sessionStorage.setItem(event.target.name, event.target.value);
    };

    const clearFilter = () => {

        console.log("ENTRAMOS EN clearFilter");

        // sessionStorage.setItem('name', '');
        // sessionStorage.setItem('minPrice', '');
        // sessionStorage.setItem('maxPrice', '');
        // sessionStorage.setItem('status', '');
        // sessionStorage.setItem('tag', '');

        // sessionStorage.removeItem('name');
        // sessionStorage.removeItem('minPrice');
        // sessionStorage.removeItem('maxPrice');
        // sessionStorage.removeItem('status');
        // sessionStorage.removeItem('tag');

        console.log('sessionStorage:', sessionStorage);

        sessionStorage.clear();

        console.log('sessionStorage:', sessionStorage);
        
        guardarTerminoBusqueda(initialValues);

        console.log('sessionStorage:', sessionStorage);

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

        //setReloadTags( true );

        // Habría que llamar a setReloadAdvertisements
        setReloadAdvertisements (true);
        guardarBusqueda ('');


        //history.push('/dashboard');
    }

    const buscarAnuncio = async (event) => {
        event.preventDefault();

        const { name, minPrice, maxPrice, status, tag } = terminoBusqueda;
        let queryParams = '';

        queryParams = name !== '' ? queryParams += `&name=${name}` : queryParams += '';
        queryParams = status !== '' ? queryParams += `&status=${status}` : queryParams += '';
        //queryParams = status !== '' ? queryParams += `&toSell=${status}` : queryParams += '';
        queryParams = tag ? queryParams += `&tags=${tag}` : queryParams += '';
        if(minPrice && maxPrice) {
            queryParams = queryParams += `&price=${minPrice}-${maxPrice}`
        }
        else {
            if(minPrice || maxPrice) {
                //queryParams = (!minPrice && maxPrice) ? queryParams += `&price=0-${maxPrice}` : queryParams += `&price=${minPrice}-999999999999999999999999999999999999`;
                queryParams = queryParams += `&price=${minPrice}-${maxPrice}`;
            }
        }
        
        // console.log('queryParams:', queryParams);

        // // Validar
        // if(terminoBusqueda === '') {
        //     //guardarError(true);
        //     return;
        // }

        //return;
        //console.log("terminoBusqueda:", terminoBusqueda);

        // Enviar el termino hacia el componente principal
        //guardarError(false);
        setReloadAdvertisements (true);
        //guardarBusqueda (terminoBusqueda);
        guardarBusqueda (queryParams);
    }

    // useEffect(() => {
    //     if( reloadTags ){
    //     const loadTags = async () => {
    //         // realizamos la consulta al API
    //         const resultTags = await getTags ();
    //         // console.log('resultAds:', resultAds.rows);
    //         //setObjectForm.tags( resultTags );

    //         guardarTerminoBusqueda( { ...terminoBusqueda, tags : resultTags } );

    //         //sessionStorage.setItem('tags', resultTags.name);
            
            
    //         resultTags.forEach(tag => {
    //             console.log("Tag:", tag.name);
    //         });

    //         console.log("resultTags:", resultTags);
    //         console.log("resultTags.name:", resultTags.name);
    //         //console.log("sessionStorage-Tags:", sessionStorage.getItem('tags'));

    //         // resultTags.forEach(tag => {
    //         //     arrayTags.push({name:tag.name, status:false});
    //         // });
    //         // console.log("arrayTags:", arrayTags);
    //     }
    //     loadTags();

    //     // We change to false the recharge of articles so that it isn't recharging continuously
    //     setReloadTags( false );
    //     }
    // }, [ reloadTags, terminoBusqueda ]);

    
    return (
        // <form onSubmit={buscarAnuncio}>
        //     <div className='row ml-1 mr-1'>
        //         <div className='form-group col-md-8'>
        //             <input 
        //                 type='text'
        //                 className='form-control form-control-lg'
        //                 placeholder='Busca algún anuncio por su nombre'
        //                 onChange={(e) => guardarTerminoBusqueda(e.target.value)}
        //             />
        //         </div>
        //         <div className='form-group col-md-4'>
        //             <input 
        //                 type='submit'
        //                 className='btn btn-lg btn-danger btn-block'
        //                 value='Buscar'
        //             />
        //         </div>
        //     </div>
        // </form>

        <form onSubmit={buscarAnuncio}>
                    
        <Form.Group className='ml-3 mr-3'>

            <Link to={`/createAd`} >
                <Button variant='primary' size='lg' className='mb-3' style={{ marginTop: '6rem' }} block>
                    {props.intl.formatMessage({ id: 'dashboard.createAd' })}
                </Button>
            </Link>

            <Form.Row>
                <Form.Group as={Col} md="12" >
                    <Form.Label className='label'>{props.intl.formatMessage({ id: 'filter.whatAreYouLookingFor' })}</Form.Label>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="6" >
                    {/* <Form.Label className='label'>{props.intl.formatMessage({ id: 'filter.whatAreYouLookingFor' })}</Form.Label> */}
                    <Form.Control type="text"
                        placeholder={props.intl.formatMessage({ id: 'filter.whatAreYouLookingForPlaceholder' })}
                        name="name"
                        id="name"
                        onChange={handleChange} 
                        // onChange={(e) => guardarTerminoBusqueda(e.target.value)}
                        value={sessionStorage.getItem('name')}
                    />
                </Form.Group>

                <Form.Group as={Col} md="3" >
                    {/* <Form.Label>&nbsp;</Form.Label> */}
                    <Form.Control as="select" 
                        name="tag"
                        id="tag"
                        onChange={handleChange}
                        value={sessionStorage.getItem('tag')}
                        >
                            <option value="" defaultValue>{props.intl.formatMessage({ id: 'filter.selectTag' })}</option>
                            {tags.map(itemTag => {
                                return (
                                    <option key={itemTag} value={itemTag}>{itemTag}</option>
                                );
                            })}
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} md ="3" >
                    {/* <Form.Label>&nbsp;</Form.Label> */}
                    <Form.Control as="select" 
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
                <Form.Group as={Col} >
                    {/* <Form.Label className='label'>{props.intl.formatMessage({ id: 'filter.minimalPrice' })}</Form.Label> */}
                    <Form.Control type="number" 
                        placeholder={props.intl.formatMessage({ id: 'filter.minimalPricePlaceholder' })}
                        onChange={handleChange} 
                        name="minPrice"
                        id="minPrice"
                        value={sessionStorage.getItem('minPrice')}
                        />
                </Form.Group>

                <Form.Group as={Col} >
                    {/* <Form.Label className='label'>{props.intl.formatMessage({ id: 'filter.maximumPrice' })}</Form.Label> */}
                    <Form.Control type="number" 
                        placeholder={props.intl.formatMessage({ id: 'filter.maximumPricePlaceholder' })} 
                        onChange={handleChange} 
                        name="maxPrice"
                        id="maxPrice"
                        value={sessionStorage.getItem('maxPrice')}
                        />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="8" >
                    <Button type="submit" variant="primary" size="lg" block>
                        {props.intl.formatMessage({ id: 'filter.searchAds' })}
                    </Button>
                </Form.Group>

                <Form.Group as={Col} md="4" >
                    <Button variant="warning" size="lg" block onClick={clearFilter}>
                        {props.intl.formatMessage({ id: 'filter.clearFilter' })}
                    </Button>
                </Form.Group>
            </Form.Row>

        </Form.Group>

    </form>
    )
}
const filter = injectIntl(Filter);
export { filter };
export default Filter;