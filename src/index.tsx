import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700&display=swap');
  
  body {
    background: #ececec;
    display: flex;
    flex-wrap: wrap;
    font-family: 'Titillium Web', sans-serif;
    justify-content: center;
    margin-top: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

/** Entry point */
ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>,
  document.getElementById('root'),
);
