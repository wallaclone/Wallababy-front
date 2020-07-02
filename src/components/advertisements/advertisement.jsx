import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import apiCall from '../api/api';

const { deleteAd } = apiCall();

const advertisement = ({ advertisement, setReloadAdvertisements }) => {
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

    // const dateFormatted = new Intl.DateTimeFormat('es-ES', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format( fecha_creacion );
    const date = new Date(date_creation);
    const day = date.getDate().toString();
    const month = date.getMonth().toString();
    const year = date.getFullYear().toString();
    let dateFormatted = `${day}-${month}-${year}`.toString();
    
    const deleteAD = async (idAd) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then( async (result) => {
            if (result.value) {
                try {
                    const adDeleted = await deleteAd (idAd);
                    // console.log("adDeleted", adDeleted);
                    // console.log("result.value:", result.value);
                    if(adDeleted.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your advertisement has been deleted.',
                            'success'
                        )

                        // We reload ads to make the removed ad disappear
                        setReloadAdvertisements(true);
                    }
                } catch (error) {
                    console.log(error);
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

        <div className="col mb-4" key={_id}>
            <div className="card h-100">
                <img src={`${BACK_IMAGE_PATH}${image}`} className="card-img-top" alt={name} />
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`/dashboard/${_id}`}>
                            {name}
                        </Link>
                    </h5>
                    <p className="card-text"><strong>Price:</strong> {price} &euro;</p>
                    <p className="card-text"><strong>Type:</strong> {status ? 'Buy' : 'Sell'}</p>
                    <p className="card-text"><strong>Tags:</strong> {tags}</p>
                    <p className="card-text">
                        <strong>owner:</strong>&nbsp;
                        <Link className='forgot-pass' to={`/adsOwner/${owner}`}>
                            {owner}
                        </Link>
                    </p>
                </div>

                <div className="card-footer text-center">
                    <Link to={`/seeAd/${_id}`}> 
                        <Button variant='success' size='lg' className='mt-2 button' block>
                            See full Advertisement
                        </Button>
                    </Link>

                    <Form.Row className='mt-2'> {/* 'ml-1 mr-1' */}
                        <Form.Group as={Col}  controlId="formGridCreateAd">
                            <Link to={`/dashboard/${_id}`}>
                                <Button variant='danger' size='lg' onClick={ ()=> deleteAD(_id) } block>
                                    Delete
                                </Button>
                            </Link>
                        </Form.Group>

                        <Form.Group as={Col}  controlId="formGridCreateAd">
                            <Link to={`/editAd/id=${_id}`}>
                                <Button variant='info' size='lg' block>
                                    Edit
                                </Button>
                            </Link>
                        </Form.Group>
                    </Form.Row>
                </div>

                <div className="card-footer text-center">
                    <small className="text-muted">( Created at: {dateFormatted} )</small>
                </div>
            </div>
        </div>
 
    );
}

export default advertisement;