import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './styles/globalStyles.styles';



ReactDOM.render(  //  los importes globalStyles y App y se renderizan en el div root
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById('root')
);
