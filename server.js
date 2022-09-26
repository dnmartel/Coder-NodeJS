// Importo dependencias de express
const express = require("express");
const app = express();
const path = require("path");

// Importo router productos
const productos = require("./routers/productos");
const formulario = require("./routers/formulario");

// Defino el puerto de escucha
const PORT = 8080;

// Defino el formato de entrada - json() y urlencoded() Parsean el contenido de POST y PUT dentro del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defino ruta principal y subrutas
app.use("/", formulario, productos);

// View engine config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Escucha del servidor
const server = app.listen(PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});

// Manejo de errores
server.on("error", (error) => console.log(`Error en servidor ${error}`));
