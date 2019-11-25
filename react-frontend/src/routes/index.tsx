import React from 'react';
import { Route, Switch } from 'react-router';

// Components
import { Home } from '../components';
import { UserForm } from '../components/UserForm/UserForm';

const routes = () => ( 
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/create">
      <UserForm />
    </Route>
    <Route path="/edit/:userId">
      <UserForm />
    </Route>
    <Route path="*" render={() => (<div>Not Found</div>)} />
  </Switch>
);

export default routes;