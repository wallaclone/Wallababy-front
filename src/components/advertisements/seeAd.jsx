import React, { useState, useEffect, useContext } from 'react';

import { faHeart, faKissWinkHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button, Badge, Form, Col } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { useParams, useHistory, Link } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';

import apiCall from '../../api/api';
import { AuthContext } from '../../contexts/authContext';

const { getAd, getFavorites, deleteFavorite, addFavorite, markAsSold, markAsNotSold, markAsReserved, markAsUnreserved } = apiCall();

function SeeAd(props) {
    const BACK_IMAGE_PATH = 'http://localhost:3000/images/';
    const [reloadAdvertisement, setReloadAdvertisement] = useState(true);
    const history = useHistory();
    const { _id } = useParams();
    const [advertisement, setAdvertisement] = useState({});
    const [favs, setFavs] = useState([]);
    const [inList, setInList] = useState([])

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
    };

    const addFav = async (id) => {
        await addFavorite(id)
        setInList(true)
    };

    const sell = async (id) => {
        await markAsSold(id)
        setAdvertisement({ ...advertisement, sold: true });
    };

    const dontSell = async (id) => {
        await markAsNotSold(id)
        setAdvertisement({ ...advertisement, sold: false });
    };

    const reserve = async (id) => {
        await markAsReserved(id)
        setAdvertisement({ ...advertisement, reserved: true });
    };

    const dontReserve = async (id) => {
        await markAsUnreserved(id)
        setAdvertisement({ ...advertisement, reserved: false });
    };

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
            };
            //loadAd(props.match.params._id);
            loadAd(_id);
            setReloadAdvertisement(false);
        }
    }, [reloadAdvertisement, _id]); //[ reloadAdvertisement, props.match.params._id ]);   

    const formatTag = (tag) => {
        if(tag !== undefined && tag !== null && tag !== '') {
          switch (tag) {
            case 'Comfort':
              return props.intl.formatMessage({ id: 'tag.comfort' });
            case 'Educational':
              return props.intl.formatMessage({ id: 'tag.educational' });
            case 'Accessories':
              return props.intl.formatMessage({ id: 'tag.accessories' });
            case 'Promotions':
              return props.intl.formatMessage({ id: 'tag.promotions' });
            case 'Food':
              return props.intl.formatMessage({ id: 'tag.food' });
            case 'Furniture':
              return props.intl.formatMessage({ id: 'tag.furniture' });
            case 'Security':
              return props.intl.formatMessage({ id: 'tag.security' });
            case 'Entertainment':
              return props.intl.formatMessage({ id: 'tag.entertainment' });
            case 'Toys':
              return props.intl.formatMessage({ id: 'tag.toys' });
            case 'Costume':
              return props.intl.formatMessage({ id: 'tag.costume' });
            case 'Hobby':
              return props.intl.formatMessage({ id: 'tag.hobby' });
            case 'Clothes':
              return props.intl.formatMessage({ id: 'tag.clothes' });
            case 'Footwear':
              return props.intl.formatMessage({ id: 'tag.footwear' });
            default:
              return tag;
          }
        }
        return '';
    };

    const formatTags = (tags) => {
        let formatedTags = '';
        if(tags) {
            for(let i=0; i<tags.length; i++) {
                if((i+1)<tags.length){
                    formatedTags += formatTag(tags[i]) + ', ';
                }
                else {
                    formatedTags += formatTag(tags[i]) + '.';
                }
            }
        }
        return formatedTags;
    };

    return (
        <div className="m-3">
            
            <Card key={advertisement._id} style={{ marginTop: '6rem' }}>
                <Card.Img variant='top' src={`${BACK_IMAGE_PATH}${advertisement.image}`} />
                <Card.Body>
                    <Card.Title><h2 className='titles'>{advertisement.name}</h2></Card.Title>
                    <Card.Text>
                        <p><strong>{props.intl.formatMessage({ id: 'advertisement.price' })}:</strong> {advertisement.price}€</p>
                        <p><strong>{props.intl.formatMessage({ id: 'advertisement.type' })}:</strong> {advertisement.status === true ? props.intl.formatMessage({ id: 'advertisement.typeBuy' }) : props.intl.formatMessage({ id: 'advertisement.typeSell' })}</p>
                        <p><strong>{props.intl.formatMessage({ id: 'advertisement.tags' })}:</strong> {formatTags(advertisement.tags)} </p>
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
                            {advertisement.reserved === true  && !advertisement.sold ? <Badge className='badge-reserved'>{props.intl.formatMessage({ id: 'advertisement.reserved' })}</Badge> : null}
                            {advertisement.sold === true ? <Badge variant="danger">{props.intl.formatMessage({ id: 'advertisement.sold' })}</Badge> : null}
                        </p>
                        <p>{advertisement.owner === user && !advertisement.reserved && !advertisement.sold && !advertisement.status ? <Button className="button2" onClick={() => reserve(advertisement._id)}>{props.intl.formatMessage({ id: 'advertisement.markreserved' })}</Button> : null}</p>
                        <p>{advertisement.owner === user && advertisement.reserved && !advertisement.sold && !advertisement.status ? <Button className="button2" onClick={() => dontReserve(advertisement._id)}>{props.intl.formatMessage({ id: 'advertisement.cancelr' })}</Button> : null}</p>
                        <p>{advertisement.owner === user && !advertisement.sold && !advertisement.status ? <Button className='button2' onClick={() => sell(advertisement._id)}>{props.intl.formatMessage({ id: 'advertisement.marksold' })}</Button> : null}</p>
                        <p>{advertisement.owner === user && advertisement.sold && !advertisement.status ? <Button className='button2' onClick={() => dontSell(advertisement._id)}>{props.intl.formatMessage({ id: 'advertisement.markNotSold' })}</Button> : null}</p>
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


                    {( user && user.toLowerCase() !== 'guest' && user !== advertisement.owner ) 
                    ?
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
                        </Form.Row> 
                    :  
                        <Button variant='secondary' size='lg' className='button' block onClick={() => history.goBack()}>
                            {props.intl.formatMessage({ id: 'seeAd.buttonReturnAd' })}
                        </Button>
                    }



                    {/* <Form.Row>
                        <Form.Group as={Col} controlId="formGridFavorite">
                            {
                            (!user || user.toLowerCase() === 'guest') 
                            ?
                                <Button variant='secondary' size='lg' block disabled>
                                    {props.intl.formatMessage({ id: 'favorites.add' })} 
                                </Button>
                            :
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
                    </Form.Row> */}

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
