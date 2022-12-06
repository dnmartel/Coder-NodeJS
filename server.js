// Importo dependencias de express
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import http from "http";
import handlebars from "express-handlebars";
import initSocket from "./socket.js";
import routers from "./routers/index.js";
import randomsRouter from "./routers/randoms.js";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import config from "./config.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import usersModel from "./models/usuariosModel.js";
import bcrypt from "bcrypt";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import cluster from "cluster";
import os from "os";

// Configuración de YARGS segun documentación
const argv = yargs(hideBin(process.argv)).default({
    p: 8080,
    port: 8080,
    modo: "fork"
}).argv;

console.log(argv);


const app = express();
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Passport - SignIn y SignUp
passport.use(
    "sign-in",
    new LocalStrategy(
        {
            usernameField: "email"
        },
        (email, password, done) => {
            usersModel
                .findOne({ email })
                .then((user) => {
                    if (!user) {
                        console.log(`Usuario ${email} no encontrado.`);

                        return done(null, false);
                    }

                    if (!bcrypt.compareSync(password, user.password)) {
                        console.log("Contraseña inválida");

                        return done(null, false);
                    }
                    done(null, user);
                })
                .catch((error) => {
                    console.log("Error en el login", error.message);

                    done(error, false);
                });
        }
    )
);
passport.use(
    "sign-up",
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true
        },
        (req, email, password, done) => {
            usersModel
                .findOne({ email })
                .then((user) => {
                    if (user) {
                        console.log(`El usuario ${email} ya existe.`);
                        return done(null, false);
                    } else {
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(req.body.password, salt);
                        req.body.password = hash;

                        return usersModel.create(req.body);
                    }
                })
                .then((newUser) => {
                    console.log(newUser);
                    if (newUser) {
                        console.log(`Registro completo: ${newUser.email}.`);

                        done(null, newUser);
                    } else {
                        throw new Error("User already exists");
                    }
                })
                .catch((error) => {
                    console.log("Error en el registro", error.message);
                    return done(error);
                });
        }
    )
);
// Configuración de Passport - Serialización para persistencia de sesiones
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((_id, done) => {
    usersModel
        .findById(_id)
        .then((user) => {
            done(null, user);
        })
        .catch((error) => {
            console.log("Error en la deserialización:", error.message);
            done(error);
        });
});

// Defino el formato de entrada - json() y urlencoded() Parsean el contenido de POST y PUT dentro del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
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
// Inicializo passport
app.use(passport.initialize());
app.use(passport.session());

// Defino ruta principal y subrutas
app.use("/", routers, randomsRouter);
app.use(express.static(path.join(__dirname, "public")));

// View engine config
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// CLUSTER
if (argv.modo === "cluster") {
    if (cluster.isPrimary) {
        const numCPU = os.cpus().length;

        console.log(`Proceso principal: ${process.pid}`, "---  Cores", numCPU);
        for (let i = 0; i < numCPU; i++) {
            cluster.fork();
        }
        cluster.on("exit", (worker, code, signal) => {
            console.log(
                `Worker killed ${worker.process.pid} | code: ${code} | signal: ${signal} `
            );
            console.log("Configurando nuevo Worker 👌");
            cluster.fork();
        });
    } else {
        // Instancio y pongo en escucha el servidor
        const server = http.createServer(app);
        initSocket(server);
        server.listen(argv.p || argv.port, () => {
            console.log(
                `Servidor http esta escuchando en el puerto ${
                    server.address().port
                }`
            );
            console.log(
                `Servidor corriendo en http://localhost:${
                    server.address().port
                } PID: ${process.pid} - MODO: ${argv.modo}`
            );
        });

        // Manejo de errores
        server.on("error", (error) =>
            console.log(`Error en servidor ${error}`)
        );
    }
}
// FORK
if (argv.modo === "fork") {
    // Instancio y pongo en escucha el servidor
    const server = http.createServer(app);
    initSocket(server);
    server.listen(argv.p || argv.port, () => {
        console.log(
            `Servidor http esta escuchando en el puerto ${
                server.address().port
            }`
        );
        console.log(
            `Servidor corriendo en http://localhost:${
                server.address().port
            } PID: ${process.pid} - MODO: ${argv.modo}`
        );
    });

    // Manejo de errores
    server.on("error", (error) => console.log(`Error en servidor ${error}`));
}
