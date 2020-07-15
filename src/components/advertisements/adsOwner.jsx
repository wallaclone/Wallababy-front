import React, { useState, useEffect } from 'react';
import { advertisement as Advertisement } from './advertisement';
import { useParams } from 'react-router-dom';
import apiCall from '../../api/api';

import { injectIntl } from 'react-intl';

const { getAds } = apiCall();

function AdsOwner () {
    const { owner } = useParams();
    const [adsOwner, setAdsOwner] = useState([]);
    const [reloadAdsOwner, setReloadAdsOwner] = useState(true);

    useEffect(() => {
        if (reloadAdsOwner){
            const getAdsOwner = async () => {
                const ownerAdverts = await getAds(`&owner=${owner}`);
                setAdsOwner(ownerAdverts.rows);
            }
            getAdsOwner();
            setReloadAdsOwner(false);
        }
    }, [ reloadAdsOwner ])
    
    return (        
        <div>
            {adsOwner.map( ownerAdvert => (
                <Advertisement 
                    key = { ownerAdvert._id }
                    advertisement = { ownerAdvert }
                    setReloadAdsOwner = { setReloadAdsOwner }
                />
            ))}
        </div>
    )
}

const adsOwner = injectIntl(AdsOwner);
export { adsOwner };