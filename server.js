// Importo dependencias de express
import express from "express";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import * as dotenv from 'dotenv' 
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// SETEAR ADMINISTRADOR
export const isAdmin = true;

import productos from "./routers/productos.js";
import carrito from "./routers/carrito.js";
import routerError from "./routers/routerError.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", productos, carrito);
app.use("*", routerError);

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
