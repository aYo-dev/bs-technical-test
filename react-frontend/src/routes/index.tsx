import React from 'react';
import { Route, Switch } from 'react-router';

// Components
import { Home } from '../components';

const routes = ( 
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default routes;