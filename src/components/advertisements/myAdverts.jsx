import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import apiCall from '../../api/api';
import { Button, Form, Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import {FormattedMessage, injectIntl, FormattedDate, FormattedTime, FormattedRelativeTime} from 'react-intl';

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
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1768ac',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then( async (result) => {
            if (result.value) {
                
                try {
                    const adDeleted = await deleteAd(idAd);
                    if(adDeleted.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your advertisement has been deleted.',
                            'success'
                        ).then(
                            () => { window.location.reload(); setReloadAdvertisements(true); }
                        )            
                    }
                } catch (error) {
                    console.log("error", error);
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'There was a mistake. Try again.'
                    })
                }
            }
        })
    }

    return (
        <>
        <div className= 'm-3'>
        <h2 className='titles'> {props.intl.formatMessage({ id: 'yourads.title' })}</h2>
            { (adverts.length === 0) ? <div> {props.intl.formatMessage({ id: 'yourads.empty' })}</div> :adverts.map(advert => {
                return(
                    <div className="col mb-4" key={advert._id}>
                    <div className="card h-100">
                        <img src={`${BACK_IMAGE_PATH}${advert.image}`} className="card-img-top" style={{objectFit: "cover", width: "100%", height:"50vh"}} alt={advert.name} />

                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/dashboard/${advert._id}`}  className='ad-name'>
                                    {advert.name}
                                </Link>
                            </h5>
                            <p className="card-text"><strong>Price:</strong> {advert.price} &euro;</p>
                            <p className="card-text"><strong>Type:</strong> {advert.status ? 'Buy' : 'Sell'}</p>
                            <p className="card-text"><strong>Tags:</strong> {advert.tags}</p>
                            <p className="card-text">
                                <strong>owner:</strong>&nbsp;
                                <Link className='forgot-pass' to={`/adsOwner/${advert.owner}`}>
                                    {advert.owner}
                                </Link>
                            </p>
                        </div>

                        <div className="card-footer text-center">
                            <Link to={`/seeAd/${advert._id}/${advert.name}`}>
                                <Button variant='success' size='lg' className='mt-2 button' block>
                                    See full Advertisement
                                </Button>
                            </Link>

                            <Form.Row className='mt-2'>
                                <Form.Group as={Col}  controlId="formGridCreateAd">
                                    <Link to={`/dashboard/${advert._id}`}>
                                        <Button variant='danger' size='lg' onClick={ event=> deleteAD(event, advert._id) } block>
                                            Delete
                                        </Button>
                                    </Link>
                                </Form.Group>

                                <Form.Group as={Col}  controlId="formGridCreateAd">
                                    <Link to={{
                                        pathname: `/editAd/id=${advert._id}`,
                                        query: advert
                                        }}>
                                        <Button className='button2' size='lg' block>
                                            Edit
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