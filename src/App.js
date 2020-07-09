import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Form, Col, Button } from "react-bootstrap";

//import { useIntl } from 'react-intl';
import {IntlProvider} from 'react-intl';
import {messages as allMessages} from './messages/messages';

//import PasswordRecovery from './components/auth/passwordRecovery';
import {Passwordrecovery as PasswordRecovery} from './components/auth/passwordRecovery';
// import Signup from './components/auth/signup';
import {SignUp as Signup} from './components/auth/signup';
// import Login from './components/auth/login';
import {LogIn as Login} from './components/auth/login';
// import Header from './components/layout/header';
import {header as Header} from './components/layout/header';
import AuthContextProvider from './contexts/authContext';
// import ChangePassword from './components/auth/changePassword';
import {Changepassword as ChangePassword} from './components/auth/changePassword';
//import CreateAd from './components/advertisements/createAd';
import {createAD as CreateAd} from './components/advertisements/createAd';
// import Dashboard from './components/advertisements/dashboard';
import {dashboard as Dashboard} from './components/advertisements/dashboard';
// import SeeAd from './components/advertisements/seeAd';
import {seeAd as SeeAd} from './components/advertisements/seeAd';
import { Editad as EditAd } from './components/advertisements/editAd';
import { Myadverts as MyAdverts } from './components/advertisements/myAdverts';
import { Editprofile as EditProfile } from './components/user/editProfile';
import {filter as Filter} from './components/layout/filter';

import ant from './img/ant.png';
import sig from './img/sig.png';

import apiCall from './components/api/api';
const { getAds, getTags, limit } = apiCall();

function App(props) {

  const [ advertisements, setAdvertisements ] = useState([]);
  const [ reloadAdvertisements, setReloadAdvertisements ] = useState( true );

  const [busqueda, guardarBusqueda] = useState('');

  // const [ reloadLanguage, setReloadLanguage ] = useState('es-ES');
  // const [ messages, setMessages ] = useState(allMessages[reloadLanguage]);
  // console.log('--------reloadLanguage:', reloadLanguage);
  // console.log('--------messages:', messages);

  const [ currentLocale, setCurrentLocale ] = useState('es-ES');
  const [ messages, setMessages ] = useState(allMessages[currentLocale]);
  // console.log('--------currentLocale:', currentLocale);
  // console.log('--------messages:', messages);
  const [ reloadLanguage, setReloadLanguage ] = useState(currentLocale);

  const [ tags, setTags ] = useState([]);
  const [ reloadTags, setReloadTags ] = useState(true);

  const [ paginaActual, guardarPaginaActual ] = useState(1);
  const [ totalPaginas, guardarTotalPaginas ] = useState(1);

  useEffect(() => {
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

    //if(busqueda === '') return;

    if(reloadAdvertisements) {
      const loadAds = async () => {
        // realizamos la consulta al API
        const resultAds = await getAds (busqueda);
        // console.log('resultAds:', resultAds.rows);
        setAdvertisements( resultAds.rows );

        //console.log('++++advertisements:', advertisements);

      }
      loadAds();

      // We change to false the recharge of articles so that it isn't recharging continuously
      setReloadAdvertisements( false );

      // Calculate total pages
      const totalAds = 32; //COUNT(*) From Advertisements
      const adsPerPage = limit(); //parseInt(limit()); //12 
      guardarTotalPaginas(Math.ceil(totalAds / adsPerPage));
      // console.log("División:", totalAds / adsPerPage)
      // console.log("TotalPaginas:", Math.ceil(totalAds / adsPerPage))
    }

  }, [ busqueda, currentLocale, reloadAdvertisements, reloadLanguage, messages ]);

  useEffect(() => {
    if( reloadTags ){
    const loadTags = async () => {
        // realizamos la consulta al API
        const resultTags = await getTags ();
        // console.log('resultAds:', resultAds.rows);
        //setObjectForm.tags( resultTags );

        // guardarTerminoBusqueda( { ...terminoBusqueda, tags : resultTags } );

        //sessionStorage.setItem('tags', resultTags.name);
        
        // console.log("resultTags:", resultTags);
        
        let tagAux = [];
        resultTags.forEach(tag => {
            console.log("Tag:", tag.name);
            tagAux.push(tag.name);
        });
        // console.log("tagAux:", tagAux);
        setTags(tagAux);
        // console.log("tags:", tags);
       
        //console.log("sessionStorage-Tags:", sessionStorage.getItem('tags'));

        // resultTags.forEach(tag => {
        //     arrayTags.push({name:tag.name, status:false});
        // });
        // console.log("arrayTags:", arrayTags);
    }
    loadTags();

    // We change to false the recharge of articles so that it isn't recharging continuously
    setReloadTags( false );
    }
  }, [ reloadTags ]);

  const paginaAnterior = () => {
    let nuevaPaginaActual = paginaActual - 1;
    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual + 1;
    guardarPaginaActual(nuevaPaginaActual);
  }

  let disabled = '';
  
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

        {/* <Route path="/dashboard" component={Dashboard} /> */}

        {/* <Route exact path="/dashboard/:_id" component={SeeAd} /> */}

        <Route path="/editAd/:id" component={EditAd} />
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
              </AuthContextProvider>
 
              <SeeAd />
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
                guardarBusqueda = { guardarBusqueda }
                setReloadAdvertisements = { setReloadAdvertisements }
                tags = { tags }
              />
 
              <Dashboard
                advertisements = { advertisements }
                setReloadAdvertisements = { setReloadAdvertisements }
              />
              
              <Form.Row className="ml-2 mr-2">
                <Form.Group as={Col} md="6" >
                  {(paginaActual === 1) 
                    ? ( <Button variant="info" size="lg" block onClick={paginaAnterior} disabled> &laquo; <img src={ant} alt='anterior' /> </Button> ) 
                    : ( <Button variant="info" size="lg" block onClick={paginaAnterior}> &laquo; <img src={ant} alt='anterior' /> </Button> )
                  }
                </Form.Group>
                <Form.Group as={Col} md="6" >
                  {(paginaActual === totalPaginas) 
                    ? ( <Button variant="info" size="lg" block onClick={paginaSiguiente} disabled> <img src={sig} alt='siguiente' /> &raquo; </Button> ) 
                    : ( <Button variant="info" size="lg" block onClick={paginaSiguiente}> <img src={sig} alt='siguiente' /> &raquo; </Button> )
                  }
                </Form.Group>
              </Form.Row>
              
              {/* 
              {(paginaActual === 1) ? null : (
                <button type="button" onClick={paginaAnterior} className="btn btn-info mr-1">&laquo; Anterior</button>
              )}

              {(paginaActual === totalPaginas) ? null : (
                <button type="button" onClick={paginaSiguiente} className="btn btn-info">Siguiente &raquo;</button>
              )} 
              */}

            </IntlProvider>
          ) }  
        />

        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
