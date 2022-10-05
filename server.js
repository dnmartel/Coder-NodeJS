// Importo dependencias de express
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const handlebars = require("express-handlebars");

const { initSocket } = require("./socket");

// Importo router productos
const index = require("./routers/index");

// Defino el puerto de escucha
const PORT = 8080;

// Defino el formato de entrada - json() y urlencoded() Parsean el contenido de POST y PUT dentro del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Defino ruta principal y subrutas
app.use("/", index);

// View engine config
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Instancio y pongo en escucha el servidor
const server = http.createServer(app);
initSocket(server);
server.listen(PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});

// Manejo de errores
server.on("error", (error) => console.log(`Error en servidor ${error}`));
