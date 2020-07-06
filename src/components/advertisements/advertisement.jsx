import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Col } from "react-bootstrap";

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

    return (
        <div className="col mb-4" key={_id}>
            <div className="card h-100">
                {/* <img src={`${BACK_IMAGE_PATH}${image}`} className="card-img-top" alt={name} /> */}
                <img src={`${BACK_IMAGE_PATH}${image}`} className="card-img-top" style={{objectFit: "cover", width: "100%", height:"50vh"}} alt={name} />

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
                    <Link to={`/seeAd/${_id}/${name}`}> 
                        <Button variant='success' size='lg' className='mt-2 button' block>
                            See full Advertisement
                        </Button>
                    </Link>
                </div>

                <div className="card-footer text-center">
                    <small className="text-muted">( Created at: {dateFormatted} )</small>
                </div>
            </div>
        </div>
    );
}

export default advertisement;