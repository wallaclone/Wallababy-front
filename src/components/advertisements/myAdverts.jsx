import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import apiCall from '../api/api';
import { Button, Form, Col } from "react-bootstrap";

const { getAds, deleteAD } = apiCall();

export default function MyAdverts(props) {
    const {username} = useParams();
    const [adverts, setAdverts] = useState([]);
    const BACK_IMAGE_PATH = 'http://localhost:3000/images/';

    useEffect(() => {
        const getUserAdverts = async () => {
            const userAdverts = await getAds(`&owner=${username}`);
        
            setAdverts(userAdverts.rows);
        }
        getUserAdverts();
    }, [])

    return (
        <div>
            {adverts.map(advert => {
                return(
                    <div className="col mb-4" key={advert._id}>
                    <div className="card h-100">
                        <img src={`${BACK_IMAGE_PATH}${advert.image}`} className="card-img-top" style={{objectFit: "cover", width: "100%", height:"50vh"}} alt={advert.name} />

                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/dashboard/${advert._id}`}>
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
                            <Link to={`/seeAd/${advert._id}`}> 
                                <Button variant='success' size='lg' className='mt-2 button' block>
                                    See full Advertisement
                                </Button>
                            </Link>

                            <Form.Row className='mt-2'>
                                <Form.Group as={Col}  controlId="formGridCreateAd">
                                    <Link to={`/dashboard/${advert._id}`}>
                                        <Button variant='danger' size='lg' onClick={ ()=> deleteAD(advert._id) } block>
                                            Delete
                                        </Button>
                                    </Link>
                                </Form.Group>

                                <Form.Group as={Col}  controlId="formGridCreateAd">
                                    <Link to={{
                                        pathname: `/editAd/id=${advert._id}`,
                                        query: advert
                                        }}>
                                        <Button variant='info' size='lg' block>
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
    );
}