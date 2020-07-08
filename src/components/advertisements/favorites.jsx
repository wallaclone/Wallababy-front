import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import apiCall from '../api/api';

import { Button } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FormattedMessage, injectIntl, FormattedDate, FormattedTime, FormattedRelativeTime} from 'react-intl';


const {getFavorites, deleteFavorite } = apiCall();

function MyFavs(props) {
  const [favs, setFavs] = useState([]);
  const [change, setChange] = useState([])
  const BACK_IMAGE_PATH = 'http://localhost:3000/images/';

  const handleClick = async (id) => {
    await deleteFavorite(id)
    setChange(true)

  }

  useEffect(() => {
    const getFavAds = async () => {
        const userFavs = await getFavorites();
        setFavs(userFavs);
        setChange(false)
    }
    getFavAds();
}, [setFavs, change])




    return (
      <>
      <div className="m-3">
      <h2 className='favs'> {props.intl.formatMessage({ id: 'favorites.title' })}</h2>
      {
      (favs.length === 0) ? <div> {props.intl.formatMessage({ id: 'favorites.empty' })}</div> :
      <div className="row row-cols-1 row-cols-md-3">
      {favs.map(fav => {
                return(
                    <div className="col mb-4" key={fav._id}>
                    <div className="card h-100">
                        <img src={`${BACK_IMAGE_PATH}${fav.image}`} className="card-img-top" style={{objectFit: "cover", width: "100%", height:"50vh"}} alt={fav.name} />

                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/dashboard/${fav._id}`}>
                                    {fav.name}
                                </Link>
                            </h5>
                            <p className="card-text"><strong>{props.intl.formatMessage({ id: 'advertisement.price' })}:</strong> {fav.price} &euro;</p>
                    <p className="card-text"><strong>{props.intl.formatMessage({ id: 'advertisement.type' })}:</strong> {fav.status ? props.intl.formatMessage({ id: 'advertisement.typeBuy' }) : props.intl.formatMessage({ id: 'advertisement.typeSell' })}</p>
                    <p className="card-text"><strong>{props.intl.formatMessage({ id: 'advertisement.tags' })}:</strong> {fav.tags}</p>
                    <p className="card-text">
                        <strong>{props.intl.formatMessage({ id: 'advertisement.owner' })}:</strong>&nbsp;
                        <Link className='forgot-pass' to={`/adsOwner/${fav.owner}`}>
                            {fav.owner}
                        </Link>
                    </p>
                        </div>

                        <div className="card-footer text-center">
                            <Link to={`/seeAd/${fav._id}`}> 
                            <Button variant='success' size='lg' className='mt-2 button' block>
                            {props.intl.formatMessage({ id: 'advertisement.seeFullAd' })}
                            </Button>
                            </Link>
                            <Button onClick={() => handleClick(fav._id)} variant='light' size='lg' block>
                            {props.intl.formatMessage({ id: 'favorites.remove' })} <FontAwesomeIcon icon={faHeart} color='red' /> </Button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      }</div>
      </>
    );
}

const myFavs = injectIntl(MyFavs);
export { myFavs };