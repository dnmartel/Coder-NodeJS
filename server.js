// Importo dependencias de express
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import http from "http";
import handlebars from "express-handlebars";
import initSocket from "./socket.js";
import routers from "./routers/index.js";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import config from "./config.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import usersModel from "./models/usuariosModel.js";
import bcrypt from "bcrypt";
import minimist from "minimist";
import cluster from "cluster";
import os from "os";
import compression from "compression";
import { logger } from "./log/logger.js";
import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "kayden.kirlin64@ethereal.email",
        pass: "k9g2VvAqKBXHMdPTPA"
    }
});

const optsArgv = {
    default: {
        port: 8080,
        modo: "fork"
    },
    alias: {
        p: "port",
        m: "modo"
    }
};

// Configuración de Minimist segun documentación
const argv = minimist(process.argv.slice(2), optsArgv);

const PORT = argv.p || 8080;

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
                .then(async (user) => {
                    if (!user) {
                        logger.info(`Usuario ${email} no encontrado.`);
                        return done(null, false);
                    }

                    if (!bcrypt.compareSync(password, user.password)) {
                        logger.info("Contraseña inválida");
                        return done(null, false);
                    }
                    done(null, user);
                })
                .catch((error) => {
                    logger.info("Error en el login", error.message);

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
                        logger.info(`El usuario ${email} ya existe.`);
                        return done(null, false);
                    } else {
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(req.body.password, salt);
                        req.body.password = hash;

                        return usersModel.create(req.body);
                    }
                })
                .then(async (newUser) => {
                    logger.info(newUser);
                    if (newUser) {
                        try {
                            const sendRegister = await transporter.sendMail({
                                from: "Backend Node Server",
                                to: process.env.TEST_MAIL,
                                subject: "Nuevo registro",
                                text: `${newUser}`
                            });
                            logger.info(
                                "Nuevo registro ",
                                JSON.parse(sendRegister)
                            );
                        } catch (error) {
                            logger.error(error);
                        }
                        logger.info(`Registro completo: ${newUser.email}.`);

                        done(null, newUser);
                    } else {
                        logger.error("El usuario ya existe");
                    }
                })
                .catch((error) => {
                    logger.info("Error en el registro", error.message);
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
            logger.info("Error en la deserialización:", error.message);
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

// Compression a nivel servidor - Se compara en ruta /info, pasa de 1.5kb a 922 bytes
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

// Defino ruta principal y subrutas
app.use("/", routers);

// View engine config
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// CLUSTER
if (argv.modo === "cluster" && cluster.isPrimary) {
    const numCPU = os.cpus().length;

    logger.info(`Proceso principal: ${process.pid}`, "---  Cores", numCPU);
    for (let i = 0; i < numCPU; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        logger.info(
            `Worker killed ${worker.process.pid} | code: ${code} | signal: ${signal} `
        );
        logger.info("Configurando nuevo Worker 👌");
        cluster.fork();
    });
} else {
    // FORK
    // Instancio y pongo en escucha el servidor
    const server = http.createServer(app);
    initSocket(server);
    server.listen(PORT || argv.p, () => {
        logger.info(
            `Servidor http esta escuchando en el puerto ${
                server.address().port
            }`
        );
        logger.info(
            `Servidor corriendo en http://localhost:${
                server.address().port
            } PID: ${process.pid} - MODO: ${argv.modo}`
        );
    });

    // Manejo de errores
    server.on("error", (error) => logger.error(`Error en servidor ${error}`));
}
