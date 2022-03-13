import React, { useState, useEffect } from 'react';

import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ accessToken, trackUri }) => {  // se exporta el componente Player y se le pasa como parametro el accessToken y trackUri
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer  // se recibe el token y las variables de los datos son alojadas en el componente SpotifyPlayer 
      token={accessToken}
      showSaveIcon
      callback={(state) => !state.isPlaying && setPlay(false)}
      play={play}
      uris={trackUri ? trackUri : []}
      styles={{
        activeColor: '#fff',
        bgColor: '#333',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
        height: '55px',
      }}
    />
  );
};

export default Player;
