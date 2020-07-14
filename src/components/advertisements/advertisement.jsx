import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge, Form, Col } from "react-bootstrap";
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
                    {advertisement.reserved===true ? <Badge className='badge-reserved'>{props.intl.formatMessage({ id: 'advertisement.reserved' })}</Badge> : null}                   
                    {advertisement.sold===true ? <Badge variant="danger">{props.intl.formatMessage({ id: 'advertisement.sold' })}</Badge> : null}                   

                </div>

                <div className="card-footer text-center">
                    <Link to={`/seeAd/${_id}/${name}`}> 
                        <Button variant='success' size='lg' className='mt-2 button' block>
                            {props.intl.formatMessage({ id: 'advertisement.seeFullAd' })}
                        </Button>
                    </Link>
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