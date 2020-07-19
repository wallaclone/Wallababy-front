import React, { useState, useEffect, useContext } from 'react';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

import apiCall from '../../api/api';

const { isNotLogin, getFavorites, deleteFavorite } = apiCall();

function MyFavs(props) {
  const [favs, setFavs] = useState([]);
  const [change, setChange] = useState([]);
  const BACK_IMAGE_PATH = 'http://localhost:3000/images/';
  const history = useHistory();
  const { user } = useContext(AuthContext);
  
  if( isNotLogin( user, props.intl.formatMessage({ id: 'createAd.notLoggedIn' }), props.intl.formatMessage({ id: 'createAd.youAreNotLoggedIn' }) ) ) { history.push('/login'); }

  const handleClick = async (id) => {
    await deleteFavorite(id);
    setChange(true);
  };

  useEffect(() => {
    const getFavAds = async () => {
      const userFavs = await getFavorites();
      setFavs(userFavs);
      setChange(false);
    };
    getFavAds();
  }, [setFavs, change]);

  return (
    <>
      <div className="m-3">
        <h2 className="titles">{props.intl.formatMessage({ id: 'favorites.title' })}</h2>
        {
      (favs.length === 0) ? (<div> {props.intl.formatMessage({ id: 'favorites.empty' })}</div>
      ): (
          <div>
            {favs.map((fav) => (
              <div className="col mb-4" key={fav._id}>
                <div className="card h-100">
                  <img src={`${BACK_IMAGE_PATH}${fav.image}`} className="card-img-top" style={{ objectFit: 'cover', width: '100%', height: '50vh' }} alt={fav.name} />

                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/dashboard/${fav._id}`} className="ad-name">
                        {fav.name}
                      </Link>
                    </h5>
                    <p className="card-text">
                      <strong>
                        {props.intl.formatMessage({ id: 'advertisement.price' })}: </strong>{fav.price}&euro;
                    </p>
                    <p className="card-text">
                      <strong>
                        {props.intl.formatMessage({ id: 'advertisement.type' })}: </strong>
                      {fav.status ? props.intl.formatMessage({ id: 'advertisement.typeBuy' }) : props.intl.formatMessage({ id: 'advertisement.typeSell' })}
                    </p>
                    <p className="card-text">
                      <strong>
                        {props.intl.formatMessage({ id: 'advertisement.tags' })}: </strong>{fav.tags}
                    </p>
                    <p className="card-text">
                      <strong>{props.intl.formatMessage({ id: 'advertisement.owner' })}: </strong>
                      &nbsp;
                      <Link className="forgot-pass" to={`/adsOwner/${fav.owner}`}>{fav.owner}
                      </Link>
                    </p>
                  </div>

                  <div className="card-footer text-center">
                    <Link to={`/seeAd/${fav._id}/${fav.name}`}>
                      <Button variant="success" size="lg" className="mt-2 button" block>
                        {props.intl.formatMessage({ id: 'advertisement.seeFullAd' })}
                      </Button>
                    </Link>
                    <Button onClick={() => handleClick(fav._id)} variant="light" size="lg" block>
                      {props.intl.formatMessage({ id: 'favorites.remove' })}
                      <FontAwesomeIcon icon={faHeart} color="red" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
      </div>
    </>
  );
}
const myFavs = injectIntl(MyFavs);
export { myFavs };