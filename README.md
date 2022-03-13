
## Introducción

Este clon de Spotify que está hecho con React y Express le permite al usuario hacer lo siguiente

1. Inicie sesión con su cuenta de Spotify(premium para escuchar musica)
2. Busca artistas o canciones
3. Reproducir canciones
4. Ver la letra de las respectivas canciones reproducidas

# Cambion en package.json en la carpeta server 

1. Se Agregp una línea debajo de "main": "index.js": "type": "module";
2. esto nos permitirá exportar paquetes en el archivo index.js usando la sintaxis de ES6.

# Para ejecutar la aplicacion 
1. acceda a la carpeta con cd .\server\ o mediante vs
2. instale las dependencias mediante el terminal: npm init --y, npm i express cors dotenv lyrics-finder spotify-web-api-node
3. vuelva a repetir el paso #1 pero con la carpeta client
4. instale las dependencias mediante el terminal: npm init --y, npm i axios react-spotify-web-playback spotify-web-api-node styled-components
5. ahora dentro de la carpeta client 
6. para ejecutar la aplicacacion en el terminal ejecute el siguiente comando: npm start
