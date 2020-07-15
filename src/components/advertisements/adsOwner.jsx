import React, { useState, useEffect } from 'react';

import { injectIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import apiCall from '../../api/api';
import { advertisement as Advertisement } from './advertisement';

const { getAds } = apiCall();

function AdsOwner(props) {
  const { owner } = useParams();
  const [adsOwner, setAdsOwner] = useState([]);
  const [reloadAdsOwner, setReloadAdsOwner] = useState(true);

  useEffect(() => {
    if (reloadAdsOwner) {
      const getAdsOwner = async () => {
        const ownerAdverts = await getAds(`&owner=${owner}`);
        setAdsOwner(ownerAdverts.rows);
      };
      getAdsOwner();
      setReloadAdsOwner(false);
    }
  }, [reloadAdsOwner]);

  return (
    <div className="m-3">
      <h2 className="titles">
        {' '}
        {props.intl.formatMessage({ id: 'ads.owner' })}
        {' '}
        {owner}
        :
      </h2>

      {(adsOwner.length === 0) ? (
        <div>
          {owner}
          {' '}
          {props.intl.formatMessage({ id: 'ads.owner.empty' })}
          {' '}
        </div>
      ) : adsOwner.map((ownerAdvert) => (
        <Advertisement
          key={ownerAdvert._id}
          advertisement={ownerAdvert}
          setReloadAdsOwner={setReloadAdsOwner}
        />
      ))}
    </div>
  );
}

const adsOwner = injectIntl(AdsOwner);
export { adsOwner };
