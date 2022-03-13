
## Introducción

Este clon de Spotify que está hecho con React y Express le permite al usuario hacer lo siguiente

1. Inicie sesión con su cuenta de Spotify(premium para escuchar musica)
2. Busca artistas o canciones
3. Reproducir canciones
4. Ver la letra de las respectivas canciones reproducidas

# Cambio en package.json en la carpeta server 

1. Se Agregp una línea debajo de "main": "index.js": "type": "module";
2. esto nos permitirá exportar paquetes en el archivo index.js usando la sintaxis de ES6.

# Para ejecutar la aplicacion 
1. cambiar el formato de los .env.jsx a .env estan alojados en la carpeta server y client para  que asi pueda funcionar el programa con las id(normal y secreta) y uri
2. acceda a la carpeta con cd .\server\ o mediante vs
3. instale las dependencias mediante el terminal: npm init --y, npm i express cors dotenv lyrics-finder spotify-web-api-node
4. vuelva a repetir el paso #1 pero con la carpeta client
5. instale las dependencias mediante el terminal: npm init --y, npm i axios react-spotify-web-playback spotify-web-api-node styled-components
6. ahora dentro de la carpeta client 
7. para ejecutar la aplicacacion en el terminal ejecute el siguiente comando: npm start
