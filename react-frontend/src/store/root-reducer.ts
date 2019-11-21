import { combineReducers } from 'redux';
import { History } from 'history';

import { connectRouter, RouterState } from 'connected-react-router';

import userReducer, { UsersState } from '../reducers/user-reducer';

export type AppState = {
  router: RouterState,
  users: UsersState,
}

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  users: userReducer,
});

export default rootReducer;