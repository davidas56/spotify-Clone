import React from 'react';

import Dashboard from './Dashboard';
import Login from './Login';

import { Container } from './styles/App.styles';
// se importan Login y dashboard y se renderizan en el div root
const App = () => {  // se crea una funcion flecha para guardos los datos de URLSearchParams en code
  const code = new URLSearchParams(window.location.search).get('code');

  return <Container>{code ? <Dashboard code={code} /> : <Login />}</Container>;
};

export default App;
