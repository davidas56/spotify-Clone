import express from 'express';
import cors from 'cors';
import lyricsFinder from 'lyrics-finder';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

//se importan las variables de entorno

const app = express();  // se coloca a una variable constante al express
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001; // el puerto queda alojado en 3001

app.post('/login', async (req, res) => {  // se crea una funcion flecha que recibe dos parametros req y res
  const { code } = req.body;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,  // se recibe la uri en redirectUri
    clientId: process.env.CLIENT_ID,  // se recibe el id del client en clientId
    clientSecret: process.env.CLIENT_SECRET,  // se recibe el cliente secret en clientSecret
  });

  try {
    const {
      body: { access_token, refresh_token, expires_in },
    } = await spotifyApi.authorizationCodeGrant(code);

    res.json({ access_token, refresh_token, expires_in });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.post('/refresh', async (req, res) => {  // se crea una funcion flecha para recibir los parametros req y res
  const { refreshToken } = req.body;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  try {
    const {
      body: { access_token, expires_in },
    } = await spotifyApi.refreshAccessToken();
    res.json({ access_token, expires_in }); 
  } catch (err) {
    console.log(err);  // se imprime el error
    res.sendStatus(400);  //
  }
});

app.get('/lyrics', async (req, res) => {
  const { artist, track } = req.query;
  const lyrics = (await lyricsFinder(artist, track)) || 'No Lyrics Found';  // se recibe los parametros artist, track en lyrics
  res.json({ lyrics });
});

app.listen(PORT, (err) => {  // se crea una funcion flecha para recibir el parametro err
  if (err) console.log(err);
  console.log('listening on port', PORT);  // se imprime en consola el puerto
});
