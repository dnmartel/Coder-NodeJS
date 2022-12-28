// Importo dependencias de express
import { Router } from "express";
import passport from "passport";
import { logger } from "../log/logger.js";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/avatars");
    },
    filename: function (req, file, cb) {
        cb(null, req.body.email + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const router = Router();

router.get("/", (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
            res.render("login");
        } else {
            const { user } = req;
            let { email, avatar } = user;
            logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
            res.render("home", { email, avatar });
        }
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});

router.post(
    "/login",
    passport.authenticate("sign-in", {
        successRedirect: "/",
        failureRedirect: "/failureLogin"
    }),
    (req, res) => {
        try {
            logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
            res.redirect("/");
        } catch (error) {
            logger.error(`Error: ${error.message}`);
        }
    }
);

router.get("/failureLogin", (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        res.render("failureLogin.handlebars");
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});

router.post("/logout", (req, res) => {
    try {
        const { email } = req.body;
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        req.logout((error) => {
            if (!error) {
                res.render("logout.handlebars", { email });
            } else {
                res.send("Ocurrio un  error", error.message);
            }
        });
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});

router.get("/register", (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        res.render("./register.handlebars");
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});

router.get("/failureRegister", (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        res.render("failureRegister");
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});

router.post(
    "/register",
    upload.single("avatar"),
    (req, res, next) => {
        req.body.avatar = req.file.filename;
        next();
    },
    passport.authenticate("sign-up", {
        successRedirect: "/",
        failureRedirect: "/failureRegister"
    }),
    async (req, res) => {
        try {
            logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
            const { user } = req;

            logger.info("register -> user", user);
        } catch (error) {
            logger.error(`Error: ${error.message}`);
        }
    }
);

export default router;
