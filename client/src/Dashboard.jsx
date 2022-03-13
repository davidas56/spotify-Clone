import React, { useState, useEffect } from 'react';

import useAuth from './hooks/useAuth';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import SpotifyWebApi from 'spotify-web-api-node'; 
import axios from 'axios'; // se importa axios para hacer peticiones a la api
import {  // se importan los estilos
  DashBoardContainer,
  SearchInput,
  ResultsContainer,
  LyricsContainer,
  PlayerContainer,
} from './styles/Dashboard.styles';
// se exporta el componente Dashboard
const spotifyApi = new SpotifyWebApi({  // se exporta el componente SpotifyWebApi y se agrega a spotifyApi en la cual se guarda el token
  clientId: process.env.REACT_APP_CLIENT_ID,
});

const Dashboard = ({ code }) => {  //se exporta el componente Dashboard y se le pasa como parametro el code
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState('');

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
    setLyrics('');
  }
  

  useEffect(() => {  //  se crea una funcion useEffect para hacer la peticion a la api
    if (!playingTrack) return;

    (async () => {
      const {
        data: { lyrics },
      } = await axios.get(`${process.env.REACT_APP_BASE_URL}/lyrics`, {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      });
      setLyrics(lyrics);
    })();
  }, [playingTrack]);

  useEffect(() => {  // se crea una funcion useeffect para ver si la funcion a la api tiene datos
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {  
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    (async () => {
      const { body } = await spotifyApi.searchTracks(search);
      if (cancel) return;
      setSearchResults(
        body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    })();

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <DashBoardContainer>
      <SearchInput
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ResultsContainer>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <LyricsContainer>{lyrics}</LyricsContainer>
        )}
      </ResultsContainer>
      <PlayerContainer>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </PlayerContainer>
    </DashBoardContainer>
  );
};

export default Dashboard;
