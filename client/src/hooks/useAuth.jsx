import { useState, useEffect } from 'react';
import axios from 'axios';
// se importan las funciones useState y useEffect y tambien axios
const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();  // una funcion useState para guardar el token
  const [refreshToken, setRefreshToken] = useState(); // una funcion useState para guardar el refreshToken
  const [expiresIn, setExpiresIn] = useState(); // una funcion useState para guardar el expiresIn

  useEffect(() => {  // una funcion useEffect para hacer la peticion a la api
    (async () => {// se crea una funcion flecha para hacer la peticion a la api
      try {
        const {
          data: { access_token, refresh_token, expires_in },
        } = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {  
          code,
        });
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setExpiresIn(expires_in);
        window.history.pushState({}, null, '/');
      } catch {
        window.location = '/';
      }
    })();
  }, [code]);

  useEffect(() => {  // se crea una funcion flecha para hacer la peticion a la api y se guarda el token
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(async () => {
      try {
        const {
          data: { access_token, expires_in },
        } = await axios.post(`${process.env.REACT_APP_BASE_URL}/refresh`, {
          refreshToken,
        });
        setAccessToken(access_token);
        setExpiresIn(expires_in);
      } catch {
        window.location = '/';
      }
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
