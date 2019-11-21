import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { compose } from 'redux';
import thunk from 'redux-thunk'

import rootReducer from './root-reducer';

// browser history
export const history = createBrowserHistory();

const routerMiddleware = createRouterMiddleware(history);

// configure middlewares
const middlewares = [routerMiddleware, thunk];
// compose enhancers
const enhancer = compose(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer(history), initialState, enhancer);

// export store singleton instance
export default store;