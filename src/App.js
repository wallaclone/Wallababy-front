import React, { useState, useEffect } from 'react';

import { Form, Col, Button } from 'react-bootstrap';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import apiCall from './api/api';
import { adsOwner as AdsOwner } from './components/advertisements/adsOwner';
import { createAD as CreateAd } from './components/advertisements/createAd';
import { dashboard as Dashboard } from './components/advertisements/dashboard';
import { Editad as EditAd } from './components/advertisements/editAd';
import { myFavs as MyFavs } from './components/advertisements/favorites';
import { Myadverts as MyAdverts } from './components/advertisements/myAdverts';
import { seeAd as SeeAd } from './components/advertisements/seeAd';
import { Changepassword as ChangePassword } from './components/auth/changePassword';
import { LogIn as Login } from './components/auth/login';
import { Passwordrecovery as PasswordRecovery } from './components/auth/passwordRecovery';
import { SignUp as Signup } from './components/auth/signup';
import { filter as Filter } from './components/layout/filter';
import { header as Header } from './components/layout/header';
import { Editprofile as EditProfile } from './components/user/editProfile';
import AuthContextProvider from './contexts/authContext';
import ant from './img/ant.png';
import sig from './img/sig.png';
import { messages as allMessages } from './messages/messages';

const { getAds, getTags, limit } = apiCall();

function App(props) {
  const [advertisements, setAdvertisements] = useState([]);
  const [reloadAdvertisements, setReloadAdvertisements] = useState(true);

  if (!(localStorage.getItem('initCurrentLocale'))) { localStorage.setItem('initCurrentLocale', 'es-ES'); }

  const [search, setSearch] = useState('');
  const [currentLocale, setCurrentLocale] = useState(localStorage.getItem('initCurrentLocale'));

  const [messages, setMessages] = useState(allMessages[currentLocale]);
  const [reloadLanguage, setReloadLanguage] = useState(currentLocale);

  const [tags, setTags] = useState([]);
  const [reloadTags, setReloadTags] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (reloadLanguage) {
      const load = () => {
        setCurrentLocale(reloadLanguage);
        setMessages(allMessages[reloadLanguage]);
      };
      // setReloadTags(true); // Para cambiar el idioma de los TAGs
      load();
      setReloadLanguage('');
    }
  }, [reloadLanguage]);

  useEffect(() => {
    if (reloadAdvertisements) {
      const adsPerPage = limit(); // In api.js: const LIMIT = 12;
      const loadAds = async () => {
        const newSearch = search.concat(`&skip=${((currentPage - 1) * limit())}`);
        const resultAds = await getAds(newSearch);
        setAdvertisements(resultAds.rows);
        // setTotalPages(Math.ceil(resultAds.count / adsPerPage)); // Calculate total pages

        const totPages = (Math.ceil(resultAds.count / adsPerPage)) === 0 ? 1 : (Math.ceil(resultAds.count / adsPerPage));
        setTotalPages(totPages); // Calculate total pages

        // Move the screen to the top
        const jumbotron = document.querySelector('.jumbotron');
        if (jumbotron) jumbotron.scrollIntoView({ behavior: 'smooth', block: 'end' });
      };
      loadAds();
      // We change to false the recharge of articles so that it isn't recharging continuously
      setReloadAdvertisements(false);
    }
  }, [currentPage, search, reloadAdvertisements]);

  useEffect(() => {
    if (reloadTags) {
      const loadTags = async () => {

        const resultTags = await getTags();
        const tagAux = [];
        resultTags.forEach((tag) => {
          tagAux.push(tag.name);
        });
        setTags(tagAux);
      };
      loadTags();
      // We change to false the recharge of articles so that it isn't recharging continuously
      setReloadTags(false);
    }
  }, [reloadTags]);

  const paginaAnterior = () => {
    const newCurrentPage = currentPage - 1;
    setCurrentPage(newCurrentPage);
    setReloadAdvertisements(true);
  };

  const paginaSiguiente = () => {
    const newCurrentPage = currentPage + 1;
    setCurrentPage(newCurrentPage);
    setReloadAdvertisements(true);
  };

  return (
    <Router>
      <Switch>

        <Route
          exact
          path="/signup"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <Signup />
            </IntlProvider>
          )}
        />

        <Route
          exact
          path="/login"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <Login />
            </IntlProvider>
          )}
        />

        <Route
          path="/changePassword/:id"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <ChangePassword />
            </IntlProvider>
          )}
        />

        <Route
          exact
          path="/passwordRecovery"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <PasswordRecovery />
            </IntlProvider>
          )}
        />

        <Route
          path="/createAd"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage={setReloadLanguage} />
                <CreateAd
                  setReloadAdvertisements={setReloadAdvertisements}
                />
              </AuthContextProvider>
            </IntlProvider>
          )}
        />

        <Route
          path="/adsOwner/:owner"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage={setReloadLanguage} />
              </AuthContextProvider>
              <AdsOwner />
            </IntlProvider>
          )}
        />

        <Route
          path="/editAd/:id"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage={setReloadLanguage} />
                <EditAd />
              </AuthContextProvider>
            </IntlProvider>
          )}
        />


        <Route
          path="/myads/:username"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage={setReloadLanguage} />
                <MyAdverts setReloadAdvertisements={setReloadAdvertisements} />
              </AuthContextProvider>
            </IntlProvider>
          )}
        />

        <Route
          path="/myprofile"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage={setReloadLanguage} />
                <EditProfile />
              </AuthContextProvider>
            </IntlProvider>
          )}
        />

        <Route
          exact
          path="/seeAd/:_id/:name"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage={setReloadLanguage} />
                <SeeAd setReloadAdvertisements={setReloadAdvertisements} />
              </AuthContextProvider>
            </IntlProvider>
          )}
        />

        <Route
          exact
          path="/dashboard"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage={setReloadLanguage} />
              </AuthContextProvider>

              <Filter
                setSearch={setSearch}
                setReloadAdvertisements={setReloadAdvertisements}
                setCurrentPage={setCurrentPage}
                tags={tags}
              />

              <Dashboard
                advertisements={advertisements}
                setReloadAdvertisements={setReloadAdvertisements}
              />

              <Form.Row className="ml-2 mr-2">
                <Form.Group as={Col} md="6">
                  {' '}
                  {(currentPage === 1)
                    ? (
                      <Button variant="warning" size="lg" block onClick={paginaAnterior} disabled>
                        {' '}
                        <img src={ant} alt="anterior" />
                        {' '}
                      </Button>
                    )
                    : (
                      <Button variant="warning" size="lg" block onClick={paginaAnterior}>
                        {' '}
                        <img src={ant} alt="anterior" />
                        {' '}
                      </Button>
                    )}
                </Form.Group>
                <Form.Group as={Col} md="6">
                  {' '}
                  {/* &raquo; */}
                  {(currentPage === totalPages)
                    ? (
                      <Button variant="warning" size="lg" block onClick={paginaSiguiente} disabled>
                        {' '}
                        <img src={sig} alt="siguiente" />
                        {' '}
                      </Button>
                    )
                    : (
                      <Button variant="warning" size="lg" block onClick={paginaSiguiente}>
                        {' '}
                        <img src={sig} alt="siguiente" />
                        {' '}
                      </Button>
                    )}
                </Form.Group>
              </Form.Row>
            </IntlProvider>
          )}
        />

        <Route
          path="/favorites"
          render={() => (
            <IntlProvider locale={currentLocale} messages={messages}>
              <AuthContextProvider>
                <Header setReloadLanguage={setReloadLanguage} />

                <MyFavs />
              </AuthContextProvider>
            </IntlProvider>
          )}
        />

        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}
export default App;
