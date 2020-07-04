import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//import { useIntl } from 'react-intl';
import {IntlProvider} from 'react-intl';
import {messages as allMessages} from './messages/messages';

import PasswordRecovery from './components/auth/passwordRecovery';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import Header from './components/layout/header';
import AuthContextProvider from './contexts/authContext';
import ChangePassword from './components/auth/changePassword';
import CreateAd from './components/advertisements/createAd';
import Dashboard from './components/advertisements/dashboard';
import SeeAd from './components/advertisements/seeAd';

import apiCall from './components/api/api';
const { getAds } = apiCall();

function App() {

  const [ advertisements, setAdvertisements ] = useState([]);
  const [ reloadAdvertisements, setReloadAdvertisements ] = useState( true );

  // const [ reloadLanguage, setReloadLanguage ] = useState('es-ES');
  // const [ messages, setMessages ] = useState(allMessages[reloadLanguage]);
  // console.log('--------reloadLanguage:', reloadLanguage);
  // console.log('--------messages:', messages);

  const [ currentLocale, setCurrentLocale ] = useState('es-ES');
  const [ messages, setMessages ] = useState(allMessages[currentLocale]);
  // console.log('--------currentLocale:', currentLocale);
  // console.log('--------messages:', messages);
  const [ reloadLanguage, setReloadLanguage ] = useState(currentLocale);
  

  useEffect(() => {
    
    if(reloadAdvertisements) {
      const loadAds = async () => {
        // realizamos la consulta al API
        const resultAds = await getAds ();
        // console.log('resultAds:', resultAds.rows);
        setAdvertisements( resultAds.rows );
      }
      loadAds();

      // We change to false the recharge of articles so that it isn't recharging continuously
      setReloadAdvertisements( false );
    }

    if(reloadLanguage) {
      const load = () => {
        // console.log('*ENTRO EN useEffect -> reloadLanguage:', reloadLanguage);
        setCurrentLocale(reloadLanguage);
        setMessages(allMessages[reloadLanguage]);
        // We change to false the recharge of language, so that it isn't recharging continuously
        // console.log('*currentLocale:', currentLocale);
        // console.log('*messages:', messages);
      }
      load();
      setReloadLanguage( '' );
    }

  }, [ currentLocale, reloadAdvertisements, reloadLanguage, messages ]);
  
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
            <Header />
          </AuthContextProvider>
        } />
        {/* 
       <Route exact path="/changePassword/id=:_id" component={ChangePassword} />
       <Redirect to="/login" />
       */}

        {/* <Route path="/createAd" component={() =>
         <>
          <AuthContextProvider>
            <Header />
          </AuthContextProvider>
        <CreateAd />
        </>
        } /> */}

        <Route path="/createAd" component={() =>
         
          <IntlProvider locale={currentLocale} messages={messages}>
            <AuthContextProvider>
              <Header setReloadLanguage = { setReloadLanguage } />
            </AuthContextProvider>
            
            <CreateAd 
              setReloadAdvertisements = { setReloadAdvertisements }
            />
          </IntlProvider>
         
        } />


        {/* <Route path="/createAd"
          render = { () => (
            <>
              <AuthContextProvider>
                <Header />
              </AuthContextProvider>
              <createAd
                setReloadAdvertisements = { setReloadAdvertisements }
              />
            </>
          ) }  
        /> */}


        {/* <Route path="/dashboard" component={Dashboard} /> */}

        {/* <Route exact path="/dashboard/:_id" component={SeeAd} /> */}

        {/* <Route exact path="/seeAd/:_id" component={SeeAd} /> */}

        <Route exact path="/seeAd/:_id" component={() =>
          <>
            <AuthContextProvider>
              <Header />
            </AuthContextProvider>
            <SeeAd 
            />
          </>
        } />

        <Route exact path="/dashboard"
          render = { () => (
            <>
              <AuthContextProvider>
                <Header />
              </AuthContextProvider>
              <Dashboard
                advertisements = { advertisements }
                setReloadAdvertisements = { setReloadAdvertisements }
              />
            </>
          ) }  
        />

        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
