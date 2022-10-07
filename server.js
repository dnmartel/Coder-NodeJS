// Importo dependencias de express
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");

// Importo router productos
const index = require("./routers/index");

// Defino el puerto de escucha
const PORT = 8080;

// Defino el formato de entrada - json() y urlencoded() Parsean el contenido de POST y PUT dentro del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Defino ruta principal y subrutas
app.use("/api", index);

// Instancio y pongo en escucha el servidor
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});

// Manejo de errores
server.on("error", (error) => console.log(`Error en servidor ${error}`));
