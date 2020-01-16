/*
09/01/2019 12:31am GMT: este es el último commit antes de usar el localhost:3000 como único server,
abandonaremos el localhost 4200, para ello cuando se haga una petición get al localhost:3000 se lanzará
el index.html (archivos estáticos) que se generaron con el comando ng-build.
Hasta este punto actualizamos el ng-update y todo funciona bien, cualquier error fatal
que ocurra en el futuro y nos obligue abortar mision, volveremos aquí con nueva información.
que dios nos bendiga y que chingue a su madre el América.
*/
const app = require("./Backend/app");
const http = require("http");


const port = (process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port,() => {
  console.log('listening on port ' + port);
});
