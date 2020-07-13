import React from 'react';
import { Link } from 'react-router-dom';
import {advertisement as Advertisement} from './advertisement';
import { Button } from "react-bootstrap";
import {FormattedMessage, injectIntl, FormattedDate, FormattedTime, FormattedRelativeTime} from 'react-intl';

function Dashboard(props) {
    const { advertisements, setReloadAdvertisements } = props;
    return(
        <div className="m-3">
            {/* <Link to={`/createAd`} >
                <Button variant='primary' size='lg' className='mb-3' style={{ marginTop: '6rem' }} block>
                    {props.intl.formatMessage({ id: 'dashboard.createAd' })}
                </Button>
            </Link> */}
            <div className="jumbotron" style={{ margin: '0', padding: '0', height: '0', width: '0'}}></div>
            <div className="row row-cols-1 row-cols-md-3">
                { advertisements.map( advertisement => (
                    <Advertisement
                        key = { advertisement._id }
                        advertisement = { advertisement }
                        setReloadAdvertisements = { setReloadAdvertisements }
                    />
                ) ) }
            </div>
            {/* <Link to={`/createAd`} >
                <Button variant='primary' size='lg' block>
                    {props.intl.formatMessage({ id: 'dashboard.createAd' })}
                </Button>
            </Link> */}
        </div>
    )
}
const dashboard = injectIntl(Dashboard);
export { dashboard };
// export default Dashboard;