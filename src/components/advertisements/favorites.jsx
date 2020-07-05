import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import apiCall from '../api/api';

import { Button } from "react-bootstrap";

const {getFavorites } = apiCall();

export default function MyFavs(props) {
  const [favs, setFavs] = useState([]);
  const BACK_IMAGE_PATH = 'http://localhost:3000/images/';


  useEffect(() => {
    const getFavAds = async () => {
        const userFavs = await getFavorites();
        console.log(userFavs.length)
        setFavs(userFavs);
    }
    getFavAds();
}, [])



    return (
      <>
      <div className="m-3">
      <h2 className='favs'>Your favorited ads:</h2>
      {
      (favs.length === 0) ? <div>You don't have any fav yet</div> :
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
                            <p className="card-text"><strong>Price:</strong> {fav.price} &euro;</p>
                            <p className="card-text"><strong>Type:</strong> {fav.status ? 'Buy' : 'Sell'}</p>
                            <p className="card-text"><strong>Tags:</strong> {fav.tags}</p>
                            <p className="card-text">
                                <strong>owner:</strong>&nbsp;
                                <Link className='forgot-pass' to={`/adsOwner/${fav.owner}`}>
                                    {fav.owner}
                                </Link>
                            </p>
                        </div>

                        <div className="card-footer text-center">
                            <Link to={`/seeAd/${fav._id}`}> 
                                <Button variant='success' size='lg' className='mt-2 button' block>
                                    See full Advertisement
                                </Button>
                            </Link>

                          
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
