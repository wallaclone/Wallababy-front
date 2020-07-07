import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import apiCall from '../api/api';

import {FormattedMessage, injectIntl, FormattedDate, FormattedTime, FormattedRelativeTime} from 'react-intl';

const { deleteAd } = apiCall();

function Advertisement (props) {
    const { advertisement, setReloadAdvertisements } = props;
    const { 
        _id,
        name,
        // description,
        image,
        status,
        price,
        owner,
        tags,
        date_creation,
    } = advertisement;

    const BACK_IMAGE_PATH = 'http://localhost:3000/images/';

    // // const dateFormatted = new Intl.DateTimeFormat('es-ES', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format( fecha_creacion );
    // const date = new Date(date_creation);
    // const day = date.getDate().toString();
    // const month = date.getMonth().toString();
    // const year = date.getFullYear().toString();
    // let dateFormatted = `${day}-${month}-${year}`.toString();
    
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    };

    const deleteAD = async (idAd) => {
        Swal.fire({
            title: props.intl.formatMessage({ id: 'sweetalert.areYouSure' }),
            text: props.intl.formatMessage({ id: 'sweetalert.noRevert' }),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: props.intl.formatMessage({ id: 'sweetalert.deleteIt' }),
            cancelButtonText: props.intl.formatMessage({ id: 'sweetalert.cancel' }),
        }).then( async (result) => {
            if (result.value) {
                try {
                    const adDeleted = await deleteAd (idAd);
                    // console.log("adDeleted", adDeleted);
                    // console.log("result.value:", result.value);
                    if(adDeleted.status === 200) {
                        Swal.fire(
                            props.intl.formatMessage({ id: 'sweetalert.deleted' }),
                            props.intl.formatMessage({ id: 'sweetalert.adDeleted' }),
                            props.intl.formatMessage({ id: 'sweetalert.success' })
                        )

                        // We reload ads to make the removed ad disappear
                        setReloadAdvertisements(true);
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: props.intl.formatMessage({ id: 'sweetalert.mistake' })
                    })
                }
            }
        })
    }

    return (
        <div className="col mb-4" key={_id}>
            <div className="card h-100">
                {/* <img src={`${BACK_IMAGE_PATH}${image}`} className="card-img-top" alt={name} /> */}
                <img src={`${BACK_IMAGE_PATH}${image}`} className="card-img-top" style={{objectFit: "cover", width: "100%", height:"50vh"}} alt={name} />

                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`/seeAd/${_id}`}>
                            {name}
                        </Link>
                    </h5>
                    <p className="card-text"><strong>{props.intl.formatMessage({ id: 'advertisement.price' })}:</strong> {price} &euro;</p>
                    <p className="card-text"><strong>{props.intl.formatMessage({ id: 'advertisement.type' })}:</strong> {status ? props.intl.formatMessage({ id: 'advertisement.typeBuy' }) : props.intl.formatMessage({ id: 'advertisement.typeSell' })}</p>
                    <p className="card-text"><strong>{props.intl.formatMessage({ id: 'advertisement.tags' })}:</strong> {tags}</p>
                    <p className="card-text">
                        <strong>{props.intl.formatMessage({ id: 'advertisement.owner' })}:</strong>&nbsp;
                        <Link className='forgot-pass' to={`/adsOwner/${owner}`}>
                            {owner}
                        </Link>
                    </p>
                </div>

                <div className="card-footer text-center">
                    <Link to={`/seeAd/${_id}`}> 
                        <Button variant='success' size='lg' className='mt-2 button' block>
                            {props.intl.formatMessage({ id: 'advertisement.seeFullAd' })}
                        </Button>
                    </Link>

                    <Form.Row className='mt-2'> {/* 'ml-1 mr-1' */}
                        <Form.Group as={Col}  controlId="formGridCreateAd">
                            <Link to={`/dashboard/${_id}`}>
                                <Button variant='danger' size='lg' onClick={ ()=> deleteAD(_id) } block>
                                    {props.intl.formatMessage({ id: 'advertisement.delete' })}
                                </Button>
                            </Link>
                        </Form.Group>

                        <Form.Group as={Col}  controlId="formGridCreateAd">
                            <Link to={{
                                pathname: `/editAd/id=${_id}`,
                                query: advertisement
                                }}>
                                <Button variant='info' size='lg' block>
                                {props.intl.formatMessage({ id: 'advertisement.edit' })}
                                </Button>
                            </Link>
                        </Form.Group>
                    </Form.Row>
                </div>

                <div className="card-footer text-center">
                
                <small className="text-muted">{props.intl.formatMessage({ id: 'advertisement.createdAt' })}: {props.intl.formatDate(new Date(date_creation), dateOptions)}</small>
                    {/* <small className="text-muted">( {props.intl.formatMessage({ id: 'advertisement.createdAt' })}: {dateFormatted} )</small> */}
                </div>
            </div>
        </div>
    );
}
const advertisement = injectIntl(Advertisement);
export { advertisement };
// export default Advertisement;