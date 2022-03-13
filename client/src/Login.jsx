import React from 'react';

import { LoginButton, LoginLink } from './styles/Login.styles';

const Login = () => { // se exporta el componente Login y se agregan los datos que se estan pidiendo en spotifyApi
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  return (  // se exporta el componente Login y se agregan los datos que se estan pidiendo en spotifyApi ademas se agrega un boton 
    <LoginButton>
      <LoginLink href={AUTH_URL}>Registrate Con Spotify</LoginLink>
    </LoginButton>
  );
};

export default Login;
