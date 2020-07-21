import React, { useState, useEffect, useContext } from 'react';

import { Button, Form, Col, Badge } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { Link, useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/authContext';

import apiCall from '../../api/api';

const { isNotLogin, getAds, deleteAd } = apiCall();

function MyAdverts(props) {
    const { setReloadAdvertisements } = props;
    const { username } = useParams();
    const [adverts, setAdverts] = useState([]);
    const BACK_IMAGE_PATH = 'http://localhost:3000/images/';
    const history = useHistory();
    const { user } = useContext(AuthContext);
  
    if( isNotLogin( user, props.intl.formatMessage({ id: 'createAd.notLoggedIn' }), props.intl.formatMessage({ id: 'createAd.youAreNotLoggedIn' }) ) ) { history.push('/login'); }

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
        <>
        <div className= 'm-3'>
        <h2 className='titles'> {props.intl.formatMessage({ id: 'myAdverts.title' })}</h2>
            { (adverts.length === 0) ? <div>{props.intl.formatMessage({ id: 'myAdverts.empty' })}</div> : adverts.map(advert => {
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
                            <p className="card-text"><strong>{props.intl.formatMessage({ id: 'advertisement.tags' })}:</strong> {formatTags(advert.tags)}</p>
                            <p className="card-text">
                                <strong>{props.intl.formatMessage({ id: 'advertisement.owner' })}:</strong>&nbsp;
                                <Link className='forgot-pass' to={`/adsOwner/${advert.owner}`}>
                                    {advert.owner}
                                </Link>
                            </p>
                            <p>
                            {advert.reserved === true  && !advert.sold ? <Badge className='badge-reserved'>{props.intl.formatMessage({ id: 'advertisement.reserved' })}</Badge> : null}
                            {advert.sold === true ? <Badge variant="danger">{props.intl.formatMessage({ id: 'advertisement.sold' })}</Badge> : null}
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
