import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//import { useIntl } from 'react-intl';

import PasswordRecovery from './components/auth/passwordRecovery';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import ContextTest from './components/auth/contextTest';
import AuthContextProvider from './contexts/authContext';
import ChangePassword from './components/auth/changePassword';

import CreateAd from './components/advertisements/createAd';
import Dashboard from './components/advertisements/dashboard';
import SeeAd from './components/advertisements/seeAd';
import EditAd from './components/advertisements/editAd';
import apiCall from './components/api/api';
const { getAds } = apiCall();

function App() {

  const [ advertisements, setAdvertisements ] = useState([]);
  const [ reloadAdvertisements, setReloadAdvertisements ] = useState( true );

  useEffect(() => {
    if( reloadAdvertisements ){
      const loadAds = async () => {
        // realizamos la consulta al API
        const resultAds = await getAds ('page=1');
        // console.log('resultAds:', resultAds.rows);
        setAdvertisements( resultAds.rows );
      }
      loadAds();

      // We change to false the recharge of articles so that it isn't recharging continuously
      setReloadAdvertisements( false );
    }
  }, [ reloadAdvertisements ]);
  
  return (
    <Router>
      <Switch>
        {/* 
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/editAd/id=:_id" component={EditAd} />
        <Route exact path="/dashboard/:_id" component={Detail} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/createAd" component={CreateAd} />
        */}

        <Route path="/signup" exact component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/changePassword/:id" component={ChangePassword} />
        <Route exact path="/passwordRecovery" component={PasswordRecovery} />

        <Route path="/test" component={() =>
          <AuthContextProvider>
            <ContextTest />
          </AuthContextProvider>
        } />
        {/* 
       <Route exact path="/changePassword/id=:_id" component={ChangePassword} />
       <Redirect to="/login" />
       */}
        <Route exact path="/changePassword/id=:_id" component={ChangePassword} />
        <Route path="/createAd" component={CreateAd} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}

        {/* <Route exact path="/dashboard/:_id" component={SeeAd} /> */}

        <Route exact path="/seeAd/:_id" component={SeeAd} />
        <Route path="/editAd/:id" component={EditAd} />
        <Route exact path="/dashboard"
          render = { () => (
            <Dashboard
              advertisements = { advertisements }
              setReloadAdvertisements = { setReloadAdvertisements }
            />
          ) }  
        />

        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
