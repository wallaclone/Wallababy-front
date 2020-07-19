import React, { useState, useEffect, useContext } from 'react';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button, Badge, Form, Col } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { useParams, useHistory, Link } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, EmailIcon } from 'react-share';
import Swal from 'sweetalert2';

import apiCall from '../../api/api';
import { AuthContext } from '../../contexts/authContext';

const { getAd, getFavorites, deleteFavorite, addFavorite, markAsSold, markAsNotSold, markAsReserved, markAsUnreserved, getEmail, sendEmail } = apiCall();

function SeeAd(props) {
    const { setReloadAdvertisements } = props;
    const BACK_IMAGE_PATH = 'http://localhost:3000/images/';
    const [reloadAdvertisement, setReloadAdvertisement] = useState(true);
    const history = useHistory();
    const { _id } = useParams();
    const [advertisement, setAdvertisement] = useState({});
    const [favs, setFavs] = useState([]);
    const [inList, setInList] = useState([]);
    const [email, setEmail] = useState([]);
    const { user } = useContext(AuthContext);


    useEffect(() => {
        const getFavAds = async () => {
            const userFavs = await getFavorites();
            setFavs(userFavs);

            if (userFavs.length > 0) {
                let map = userFavs.map(x => x._id);

                if (map.includes(_id)) {
                    setInList(true)
                }
            }
        }
        getFavAds();
    }, [setFavs, _id, inList])

    const deleteFav = async (id) => {
        await deleteFavorite(id)
        setInList(false);
    }

    const addFav = async (id) => {
        await addFavorite(id)
        setInList(true)
    }

    const sell = async (id) => {
        await markAsSold(id)
        setAdvertisement({ ...advertisement, sold: true });
        setReloadAdvertisements(true)
    }

    const dontSell = async (id) => {
        await markAsNotSold(id)
        setAdvertisement({ ...advertisement, sold: false });
        setReloadAdvertisements(true)

    }

    const reserve = async (id) => {
        await markAsReserved(id)
        setAdvertisement({ ...advertisement, reserved: true });
        setReloadAdvertisements(true)

    }

    const dontReserve = async (id) => {
        await markAsUnreserved(id)
        setAdvertisement({ ...advertisement, reserved: false });
        setReloadAdvertisements(true)

    }
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    };

    useEffect(() => {
        if (reloadAdvertisement) {
            const loadAd = async (id) => {
                const resultAd = await getAd(id);
                setAdvertisement(resultAd.result);
                return resultAd.result;
            };
            //loadAd(props.match.params._id);
            loadAd(_id).then(async (advertisement) => {
                const userMail = await getEmail(advertisement.owner);
                setEmail(userMail);
            });
            setReloadAdvertisement(false)
        }
    }, [reloadAdvertisement, _id]); //[ reloadAdvertisement, props.match.params._id ]);


    const contactOwner = async () => {
        const adId = advertisement._id;
        const response = await sendEmail(adId, advertisement.owner, user)
        if (response.status !== 201) {
            Swal.fire({
                icon: 'error',
                title: props.intl.formatMessage({ id: 'sweetalert.emailSentError' }),
                text: props.intl.formatMessage({ id: 'sweetalert.emailSent.TextError' }),
                timer: 15000,
                confirmButtonColor: '#1768ac',
            });
        } else {
            Swal.fire({
                title: `${props.intl.formatMessage({ id: 'sweetalert.emailSent' })} ${advertisement.owner}!`,
                text: props.intl.formatMessage({ id: 'sweetalert.emailSent.Text' }),
                timer: 25000,
                confirmButtonColor: '#1768ac',
            });
        }
    }


    return (
        <div className="m-3">
            <Card key={advertisement._id} style={{ marginTop: '6rem' }}>
                <Card.Img variant='top' src={`${BACK_IMAGE_PATH}${advertisement.image}`} />
                <Card.Body>
                    <Card.Title><h2 className='titles'>{advertisement.name}</h2></Card.Title>
                    <Card.Text>
                        <p><strong>{props.intl.formatMessage({ id: 'advertisement.price' })}:</strong> {advertisement.price}€</p>
                        <p><strong>{props.intl.formatMessage({ id: 'advertisement.type' })}:</strong> {advertisement.status === true ? props.intl.formatMessage({ id: 'advertisement.typeBuy' }) : props.intl.formatMessage({ id: 'advertisement.typeSell' })}</p>
                        <p><strong>{props.intl.formatMessage({ id: 'advertisement.tags' })}:</strong> {advertisement.tags}</p>
                        <p>
                            <strong>{props.intl.formatMessage({ id: 'advertisement.owner' })}:</strong>&nbsp;
                            <Link to={`/adsOwner/${advertisement.owner}`}>
                                <strong>{advertisement.owner}</strong>
                            </Link>
                        </p>
                        <p>
                            <strong>{props.intl.formatMessage({ id: 'seeAd.description' })}:</strong>
                            <br />
                            {advertisement.description}
                        </p>
                        <p>
                            {advertisement.reserved === true && !advertisement.sold ? <Badge className='badge-reserved'>{props.intl.formatMessage({ id: 'advertisement.reserved' })}</Badge> : null}
                            {advertisement.sold === true ? <Badge variant="danger">{props.intl.formatMessage({ id: 'advertisement.sold' })}</Badge> : null}
                        </p>

                        {/* url="https://github.com/wallaclone/wallaclone_back/tree/master"> */}
                        <FacebookShareButton
                            url={`http://localhost:3001/seeAd/${_id}/${advertisement.name}`}>
                            <FacebookIcon size={32} round={true}></FacebookIcon>
                        </FacebookShareButton>
                        &nbsp;
                        {/* url="https://github.com/wallaclone/wallaclone_back/tree/master"> */}
                        <TwitterShareButton
                            url={`http://localhost:3001/seeAd/${_id}/${advertisement.name}`}>
                            <TwitterIcon size={32} round={true}></TwitterIcon>
                        </TwitterShareButton>
                    </Card.Text>

             

                    { (user !== advertisement.owner && user && user !== 'guest') ?
                        <><Button className="button" size='lg' data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">{props.intl.formatMessage({ id: 'advertisement.interestedButton' })}</Button>
                    <div className="collapse" id="collapseExample">
                        <div className="card card-body">
                            {props.intl.formatMessage({ id: 'advertisement.contactText' })}
                                <Button className='button2' onClick={contactOwner}>{props.intl.formatMessage({ id: 'advertisement.contactButton' })}</Button>
                        </div>
                    </div></> : null
                    }

                    <Form.Row className='mt-2'>
                        <Form.Group as={Col} controlId="formGridCreateAd">
                            {advertisement.owner === user && !advertisement.sold && !advertisement.status ? <Button className='button3' size='lg' block onClick={() => sell(advertisement._id)}>{props.intl.formatMessage({ id: 'advertisement.marksold' })}</Button> : null}
                            {advertisement.owner === user && advertisement.sold && !advertisement.status ? <Button className='button2' size='lg' block onClick={() => dontSell(advertisement._id)}>{props.intl.formatMessage({ id: 'advertisement.markNotSold' })}</Button> : null}
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCreateAd">
                            {advertisement.owner === user && !advertisement.sold && !advertisement.reserved && !advertisement.status ? <Button className="button3" size='lg' block onClick={() => reserve(advertisement._id)}>{props.intl.formatMessage({ id: 'advertisement.markreserved' })}</Button> : null}
                            {advertisement.owner === user && !advertisement.sold && advertisement.reserved && !advertisement.status ? <Button className="button2" size='lg' block onClick={() => dontReserve(advertisement._id)}>{props.intl.formatMessage({ id: 'advertisement.cancelr' })}</Button> : null}
                            {advertisement.owner === user && advertisement.sold && !advertisement.status ? <Button className='button2' size='lg' block onClick={() => dontSell(advertisement._id)}>{props.intl.formatMessage({ id: 'advertisement.markNotSold' })}</Button> : null}
                        </Form.Group>
                    </Form.Row>
                    {(user !== advertisement.owner && user && user !== 'guest') ?
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFavorite">
                                {
                                        (inList === true)
                                            ? <Button onClick={() => deleteFav(advertisement._id)} variant='secondary' size='lg' block>
                                                {props.intl.formatMessage({ id: 'favorites.remove' })} <FontAwesomeIcon icon={faHeart} color='red' />
                                            </Button>
                                            : <Button onClick={() => addFav(advertisement._id)} variant='secondary' size='lg' block>
                                                {props.intl.formatMessage({ id: 'favorites.add' })} <FontAwesomeIcon icon={faHeart} color='#f7b6a0' id='heart' />
                                            </Button>
                                }
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridReturn">
                                <Button variant='secondary' size='lg' className='button' block onClick={() => history.goBack()}>
                                    {props.intl.formatMessage({ id: 'seeAd.buttonReturnAd' })}
                                </Button>
                            </Form.Group>
                        </Form.Row> : <Button variant='secondary' size='lg' className='button' block onClick={() => history.goBack()}>
                            {props.intl.formatMessage({ id: 'seeAd.buttonReturnAd' })}
                        </Button>
                    }
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
