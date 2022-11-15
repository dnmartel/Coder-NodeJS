// Importo dependencias de express
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import http from "http";
import handlebars from "express-handlebars";
import initSocket from "./socket.js";
import loginRouter from "./routers/login.js";
import productosRouter from "./routers/productos.js";
import testRouter from "./routers/test.js";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import config from "./config.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: config.mongoDB.URIsession,
            mongoOptions: advancedOptions,
            ttl: 600
        }),
        secret: "lcact",
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 600000 }
    })
);

// Defino el formato de entrada - json() y urlencoded() Parsean el contenido de POST y PUT dentro del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defino ruta principal y subrutas
app.use("/", loginRouter, productosRouter, testRouter);
app.use(express.static(path.join(__dirname, "public")));

// View engine config
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Instancio y pongo en escucha el servidor
const server = http.createServer(app);
initSocket(server);
server.listen(process.env.PORT, () => {
    console.log(
        `Servidor http esta escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});

// Manejo de errores
server.on("error", (error) => console.log(`Error en servidor ${error}`));
