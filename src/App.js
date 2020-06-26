import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Signup from './Components/auth/signup';
import Login from './Components/auth/login'

function App() {
  return (
<Router>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" component={Login} />
          </Switch>
      </Router>);
}

export default App;
