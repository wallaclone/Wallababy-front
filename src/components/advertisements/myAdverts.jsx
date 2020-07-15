import React, { useState, useEffect } from 'react';

import { Button, Form, Col } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import apiCall from '../../api/api';

const { getAds, deleteAd } = apiCall();

function MyAdverts(props) {
  const { setReloadAdvertisements } = props;
  const { username } = useParams();
  const [adverts, setAdverts] = useState([]);
  const BACK_IMAGE_PATH = 'http://localhost:3000/images/';

    useEffect(() => {
        const getUserAdverts = async () => {
            const userAdverts = await getAds(`&owner=${username}`);
            setAdverts(userAdverts.rows);
        }
        getUserAdverts();
    }, [])

    const deleteAD = async (e, idAd) => {
        e.preventDefault();
        Swal.fire({
            title: props.intl.formatMessage({ id: 'sweetalert.areYouSure' }),
            text: props.intl.formatMessage({ id: 'sweetalert.noRevert' }),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1768ac',
            cancelButtonColor: '#d33',
            confirmButtonText: props.intl.formatMessage({ id: 'sweetalert.deleteIt' }),
            cancelButtonText: props.intl.formatMessage({ id: 'sweetalert.cancel' }),
        }).then( async (result) => {
            if (result.value) {
                
                try {
                    const adDeleted = await deleteAd(idAd);
                    if(adDeleted.status === 200) {
                        Swal.fire(
                            props.intl.formatMessage({ id: 'sweetalert.deleted' }),
                            props.intl.formatMessage({ id: 'sweetalert.adDeleted' }),
                            props.intl.formatMessage({ id: 'sweetalert.success' })
                        ).then(
                            () => { window.location.reload(); setReloadAdvertisements(true); }
                        )            
                    }
                } catch (error) {
                    console.log("error", error);
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
        <>
        <div className= 'm-3'>
        <h2 className='titles'> {props.intl.formatMessage({ id: 'myAdverts.title' })}</h2>
            { (adverts.length === 0) ? <div> {props.intl.formatMessage({ id: 'myAdverts.empty' })}</div> :adverts.map(advert => {
                return(
                    <div className="col mb-4" key={advert._id}>
                    <div className="card h-100">
                        <img src={`${BACK_IMAGE_PATH}${advert.image}`} className="card-img-top" style={{objectFit: "cover", width: "100%", height:"50vh"}} alt={advert.name} />

                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/seeAd/${advert._id}/${advert.name}`} className='ad-name'>
                                {/* <Link to={`/dashboard/${advert._id}`}  className='ad-name'> */}
                                    {advert.name}
                                </Link>
                            </h5>
                            <p className="card-text"><strong>{props.intl.formatMessage({ id: 'advertisement.price' })}:</strong> {advert.price} &euro;</p>
                            <p className="card-text"><strong>{props.intl.formatMessage({ id: 'advertisement.type' })}:</strong> { advert.status ? props.intl.formatMessage({ id: 'advertisement.typeBuy' }) : props.intl.formatMessage({ id: 'advertisement.typeSell' }) }</p>
                            <p className="card-text"><strong>{props.intl.formatMessage({ id: 'advertisement.tags' })}:</strong> {advert.tags}</p>
                            <p className="card-text">
                                <strong>{props.intl.formatMessage({ id: 'advertisement.owner' })}:</strong>&nbsp;
                                <Link className='forgot-pass' to={`/adsOwner/${advert.owner}`}>
                                    {advert.owner}
                                </Link>
                            </p>
                        </div>

                        <div className="card-footer text-center">
                            <Link to={`/seeAd/${advert._id}/${advert.name}`}>
                                <Button variant='success' size='lg' className='mt-2 button' block>
                                    {props.intl.formatMessage({ id: 'advertisement.seeFullAd' })}
                                </Button>
                            </Link>

                            <Form.Row className='mt-2'>
                                <Form.Group as={Col}  controlId="formGridCreateAd">
                                    <Link to={{
                                        pathname: `/editAd/id=${advert._id}`,
                                        query: advert
                                        }}>
                                        <Button className='button2' size='lg' block>
                                            {props.intl.formatMessage({ id: 'advertisement.edit' })}
                                        </Button>
                                    </Link>
                                </Form.Group>
                                <Form.Group as={Col}  controlId="formGridCreateAd">
                                    <Link to={`/dashboard/${advert._id}`}>
                                        <Button variant='danger' size='lg' onClick={ event=> deleteAD(event, advert._id) } block>
                                            {props.intl.formatMessage({ id: 'advertisement.delete' })}
                                        </Button>
                                    </Link>
                                </Form.Group>
                            </Form.Row>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    );
}

const Myadverts = injectIntl(MyAdverts);
export { Myadverts };
