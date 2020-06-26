import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PasswordRecovery from './components/PasswordRecovery.jsx';
import Signup from './Components/auth/signup';
import Login from './Components/auth/login'

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
        <Redirect to="/passwordRecovery" />
      </Switch>
    </Router>
  );
}

export default App;
