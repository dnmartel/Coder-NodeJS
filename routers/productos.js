// Importo dependencias de express
import express from "express";
const { Router } = express;
import { logger } from "../log/logger.js";
const router = Router();
// GET '/' -> devuelve la vista renderizada.
router.get("/productos", (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        if (req.session.logged) {
            const email = req.session.email;
            res.render("./productos.handlebars", { email });
        } else {
            res.redirect("./");
        }
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
    
});

export default router;
