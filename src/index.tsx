import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { GlobalStyle } from './components/styles';

/** Entry point */
ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>,
  document.getElementById('root'),
);
