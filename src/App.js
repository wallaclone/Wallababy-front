import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Form, Col, Button } from "react-bootstrap";

import {IntlProvider} from 'react-intl';
import {messages as allMessages} from './messages/messages';

import {Passwordrecovery as PasswordRecovery} from './components/auth/passwordRecovery';
import {SignUp as Signup} from './components/auth/signup';
import {LogIn as Login} from './components/auth/login';
import {header as Header} from './components/layout/header';
import AuthContextProvider from './contexts/authContext';
import {Changepassword as ChangePassword} from './components/auth/changePassword';
import {createAD as CreateAd} from './components/advertisements/createAd';
import {dashboard as Dashboard} from './components/advertisements/dashboard';
import {seeAd as SeeAd} from './components/advertisements/seeAd';
import {Editad as EditAd} from './components/advertisements/editAd';
import {Myadverts as MyAdverts} from './components/advertisements/myAdverts';
import {Editprofile as EditProfile} from './components/user/editProfile';
import {filter as Filter} from './components/layout/filter';
import {myFavs as MyFavs} from './components/advertisements/favorites';
import {adsOwner as AdsOwner} from './components/advertisements/adsOwner';

import ant from './img/ant.png';
import sig from './img/sig.png';

import apiCall from './api/api';
const { getAds, getTags, limit } = apiCall();

function App(props) {

  const [advertisements, setAdvertisements] = useState([]);
  const [reloadAdvertisements, setReloadAdvertisements] = useState(true);

  const [ search, setSearch ] = useState('');
  const [ currentLocale, setCurrentLocale ] = useState('es-ES');

  const [ messages, setMessages ] = useState(allMessages[currentLocale]);
  const [ reloadLanguage, setReloadLanguage ] = useState(currentLocale);

  const [ tags, setTags ] = useState([]);
  const [ reloadTags, setReloadTags ] = useState(true);

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);

  useEffect(() => {
    if(reloadLanguage) {
      const load = () => {
        setCurrentLocale(reloadLanguage);
        setMessages(allMessages[reloadLanguage]);
      }
      load();
      setReloadLanguage( '' );
    }
  }, [ reloadLanguage ]);

  useEffect(() => {
    if(reloadAdvertisements) {
      const adsPerPage = limit(); //In api.js: const LIMIT = 12;
      const loadAds = async () => {
        const newSearch = search.concat(`&skip=${ ( (currentPage-1) * limit() ) }`);
        const resultAds = await getAds (newSearch);
        setAdvertisements( resultAds.rows );
        setTotalPages(Math.ceil(resultAds.count / adsPerPage)); // Calculate total pages
        // Move the screen to the top
        const jumbotron = document.querySelector('.jumbotron');
        if(jumbotron) jumbotron.scrollIntoView({behavior : 'smooth', block: 'end'});
      }
      loadAds();
      // We change to false the recharge of articles so that it isn't recharging continuously
      setReloadAdvertisements(false);
    }
  }, [ currentPage, search, reloadAdvertisements ]);

  useEffect(() => {
    if( reloadTags ){
    const loadTags = async () => {
        const resultTags = await getTags ();
        let tagAux = [];
        resultTags.forEach(tag => {
            //console.log("Tag:", tag.name);
            tagAux.push(tag.name);
        });
        // console.log("tagAux:", tagAux);
        setTags(tagAux);
    }
    loadTags();
    // We change to false the recharge of articles so that it isn't recharging continuously
    setReloadTags( false );
    }
  }, [ reloadTags ]);

  const paginaAnterior = () => {
    let newCurrentPage = currentPage - 1;
    setCurrentPage(newCurrentPage);
    setReloadAdvertisements (true);
  }

  const paginaSiguiente = () => {
    let newCurrentPage = currentPage + 1;
    setCurrentPage(newCurrentPage);
    setReloadAdvertisements (true);
  }
  
  return (
    <Router>
      <Switch>

        {/* <Route path="/signup" exact component={Signup} /> */}
        <Route exact path="/signup"
          render = { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              {/* <AuthContextProvider>
                <Header setReloadLanguage = { setReloadLanguage } />
              </AuthContextProvider> */}
 
              <Signup />
            </IntlProvider>
          ) }  
        />

        {/* <Route path="/login" component={Login} /> */}
        <Route exact path="/login"
          render = { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              {/* <AuthContextProvider>
                <Header setReloadLanguage = { setReloadLanguage } />
              </AuthContextProvider> */}
 
              <Login />
            </IntlProvider>
          ) }  
        />
        
        {/* <Route path="/changePassword/:id" component={ChangePassword} /> */}
        <Route path="/changePassword/:id"
          render = { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              {/* <AuthContextProvider>
                <Header setReloadLanguage = { setReloadLanguage } />
              </AuthContextProvider> */}
 
              <ChangePassword />
            </IntlProvider>
          ) }  
        />

        {/* <Route exact path="/passwordRecovery" component={PasswordRecovery} /> */}
        <Route exact path="/passwordRecovery"
          render = { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              {/* <AuthContextProvider>
                <Header setReloadLanguage = { setReloadLanguage } />
              </AuthContextProvider> */}
 
              <PasswordRecovery />
            </IntlProvider>
          ) }  
        />

        <Route path="/test" component={() =>
          <>
            <AuthContextProvider>
              <Header />
            </AuthContextProvider>
          </>
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

        {/* <Route path="/createAd" component={() =>
          <IntlProvider locale={currentLocale} messages={messages}>
            <AuthContextProvider>
              <Header setReloadLanguage = { setReloadLanguage } />
            </AuthContextProvider>
            
            <CreateAd 
              setReloadAdvertisements = { setReloadAdvertisements }
            />
          </IntlProvider>
        } /> */}

        <Route path="/createAd"
          render = { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage = { setReloadLanguage } />
              </AuthContextProvider>
 
              <CreateAd 
                setReloadAdvertisements = { setReloadAdvertisements }
              />
            </IntlProvider>
          ) }  
        />

        <Route path="/adsOwner/:owner"
          render = { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage = { setReloadLanguage } />
              </AuthContextProvider>

              <AdsOwner />
            </IntlProvider>
          ) }  
        />

        {/* <Route path="/dashboard" component={Dashboard} /> */}

        {/* <Route exact path="/dashboard/:_id" component={SeeAd} /> */}

        <Route path="/editAd/:id" 
          render = { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage={setReloadLanguage} />
              </AuthContextProvider>
              <EditAd />
            </IntlProvider>
          ) }
        />
        {/* <Route exact path="/seeAd/:_id" component={SeeAd} /> */}
  
        {/*<Route path='/myads/:username' component={() =>
        <>
          <AuthContextProvider>
            <Header />
          </AuthContextProvider>
          <MyAdverts 
          setReloadAdvertisements = { setReloadAdvertisements }
          />
        </>
        } />*/}

        <Route path='/myads/:username'
          render = { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage = { setReloadLanguage } />
              </AuthContextProvider>
 
              <MyAdverts 
                setReloadAdvertisements = { setReloadAdvertisements }
              />
            </IntlProvider>
          ) }  
        />


        {/*<Route path='/myprofile' component={() =>
        <>
          <AuthContextProvider>
            <Header />
            <EditProfile />
          </AuthContextProvider>
          
        </>
        } />*/}

        <Route path='/myprofile'
        render = { () => (
          <IntlProvider locale={currentLocale} messages={messages}>
            <AuthContextProvider>
              <Header setReloadLanguage = { setReloadLanguage } />
              <EditProfile />
            </AuthContextProvider>            
          </IntlProvider>
        ) }  
      />

        <Route exact path="/seeAd/:_id/:name"
          render = { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage = { setReloadLanguage } />
                <SeeAd />

              </AuthContextProvider>
 
            </IntlProvider>
          ) }  
        />

        <Route exact path="/dashboard"
          render = { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage = { setReloadLanguage } />
              </AuthContextProvider>

              <Filter
                setSearch = { setSearch }
                setReloadAdvertisements = { setReloadAdvertisements }
                setCurrentPage = { setCurrentPage }
                tags = { tags }
              />
 
              <Dashboard
                advertisements={advertisements}
                setReloadAdvertisements={setReloadAdvertisements}
              />
              
              <Form.Row className="ml-2 mr-2">
                <Form.Group as={Col} md="6"> {/* &laquo; */}
                  {(currentPage === 1) 
                    ? ( <Button variant="info" size="lg" block onClick={paginaAnterior} disabled> <img src={ant} alt='anterior' /> </Button> ) 
                    : ( <Button variant="info" size="lg" block onClick={paginaAnterior}> <img src={ant} alt='anterior' /> </Button> )
                  }
                </Form.Group>
                <Form.Group as={Col} md="6"> {/* &raquo; */}
                  {(currentPage === totalPages) 
                    ? ( <Button variant="info" size="lg" block onClick={paginaSiguiente} disabled> <img src={sig} alt='siguiente' /> </Button> ) 
                    : ( <Button variant="info" size="lg" block onClick={paginaSiguiente}> <img src={sig} alt='siguiente' /> </Button> )
                  }
                </Form.Group>
              </Form.Row>
              
              {/* 
              {(currentPage === 1) ? null : (
                <button type="button" onClick={paginaAnterior} className="btn btn-info mr-1">&laquo; Anterior</button>
              )}

              {(currentPage === totalPages) ? null : (
                <button type="button" onClick={paginaSiguiente} className="btn btn-info">Siguiente &raquo;</button>
              )} 
              */}

            </IntlProvider>
          ) }  
        />

        <Route path="/favorites" render =
            { () => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage = { setReloadLanguage } />
              </AuthContextProvider>
              <MyFavs />
            </IntlProvider>
            )} />

        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}
export default App;
