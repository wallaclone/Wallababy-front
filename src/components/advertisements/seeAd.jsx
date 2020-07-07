import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import apiCall from '../api/api';

import {FormattedMessage, injectIntl, FormattedDate, FormattedTime, FormattedRelativeTime} from 'react-intl';

const { getAd } = apiCall();

function SeeAd(props) {
    const BACK_IMAGE_PATH = 'http://localhost:3000/images/';
    const [ reloadAdvertisement, setReloadAdvertisement ] = useState(true);
    const history = useHistory();
    const { _id } = useParams();
    const [ advertisement, setAdvertisement ] = useState({});
    //console.log('id:', _id);

    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    };

    useEffect(() => {
        if( reloadAdvertisement ){
            const loadAd = async (id) => {
                const resultAd = await getAd(id);
                setAdvertisement(resultAd.result);
            };
            //loadAd(props.match.params._id);
            loadAd(_id);
            setReloadAdvertisement( false );
        }
    }, [ reloadAdvertisement, _id ]); //[ reloadAdvertisement, props.match.params._id ]);
    
    return (
        <div className="m-3">
        <Card key={advertisement._id} style={{ marginTop: '6rem' }}>
            <Card.Img variant='top' src={`${BACK_IMAGE_PATH}${advertisement.image}`} />
            <Card.Body>
                <Link to={`/dashboard/${_id}`}>
                    <Card.Title>{advertisement.name}</Card.Title>
                </Link>
                <Card.Text>                    
                    <p><strong>{props.intl.formatMessage({ id: 'advertisement.price' })}:</strong> {advertisement.price}€</p>                    
                    <p><strong>{props.intl.formatMessage({ id: 'advertisement.type' })}:</strong> {advertisement.status===true ? props.intl.formatMessage({ id: 'advertisement.typeBuy' }) : props.intl.formatMessage({ id: 'advertisement.typeSell' })}</p>                    
                    <p><strong>{props.intl.formatMessage({ id: 'advertisement.tags' })}:</strong> {advertisement.tags}</p>                    
                    <p>
                        <strong>{props.intl.formatMessage({ id: 'advertisement.owner' })}:</strong>&nbsp;
                        <Link to={`/adsOwner/${advertisement.owner}`}>
                            <strong>{advertisement.owner}</strong>
                        </Link>
                    </p>
                    <p><strong>{props.intl.formatMessage({ id: 'seeAd.description' })}:</strong>
                    <br />
                    {advertisement.description}</p>

                    <FacebookShareButton 
                        url="https://github.com/wallaclone/wallaclone_back/tree/sprint2">
                        <FacebookIcon size={32} round={true}></FacebookIcon>
                    </FacebookShareButton>
                    &nbsp;
                    <TwitterShareButton
                        url="https://github.com/wallaclone/wallaclone_back/tree/sprint2">
                        <TwitterIcon size={32} round={true}></TwitterIcon>
                    </TwitterShareButton>

                    <Button variant='primary' size='lg' className='mt-2' block onClick={() => history.goBack()}>
                        {props.intl.formatMessage({ id: 'seeAd.buttonReturnAd' })}
                    </Button>
                </Card.Text>
            </Card.Body>

            <Card.Footer>
                <small className='text-muted'>{props.intl.formatMessage({ id: 'advertisement.createdAt' })}: {props.intl.formatDate(new Date(advertisement.date_creation), dateOptions)}</small>
            </Card.Footer>
        </Card>
        </div>
    );
};
const seeAd = injectIntl(SeeAd);
export { seeAd };
// export default SeeAd;