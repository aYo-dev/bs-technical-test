import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store/store';
import Routes from './routes';
import { MuiThemeProvider } from 'material-ui/styles';

const App: React.FC = () => {
  return (
    <div className="app">
      <MuiThemeProvider>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
