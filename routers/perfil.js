import express from "express";
import { logger } from "../log/logger.js";
import { usuariosDao as usuarios } from "../daos/index.js";
const { Router } = express;
const router = Router();

router.get("/perfil", async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
            res.render("login");
        } else {
            const user = await usuarios.GetByEmail(req.query.email);
            const { email, name, age, phone, avatar, address } = user[0];
            logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
            res.render("profile", { email, name, age, phone, avatar, address });
        }
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});

export default router;
