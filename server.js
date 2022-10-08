const express = require("express");
const app = express();
const path = require("path");
const http = require("http");

// SETEAR ADMINISTRADOR
const isAdmin = true;
module.exports = isAdmin;

const productos = require("./routers/productos");
const carrito = require("./routers/carrito");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", productos, carrito);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
