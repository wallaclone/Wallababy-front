import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//import { useIntl } from 'react-intl';

import PasswordRecovery from './components/auth/passwordRecovery';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import Header from './components/layout/header';
import AuthContextProvider from './contexts/authContext';
import ChangePassword from './components/auth/changePassword';
import CreateAd from './components/createAd/createAd';

function App() {
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
        <Route path="/createAd" component={CreateAd} />
        <Redirect to="/createAd" />
      </Switch>
    </Router>
  );
}

export default App;
