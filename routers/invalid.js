import { Router } from "express";
import { logger } from "../log/logger.js";

const router = Router();

router.get("*", (req, res, next) => {
    try {
        if (
            req.originalUrl !== "/css/style.css" ||
            "/js/script.js" ||
            "/favicon.ico"
        ) {
            logger.warn(
                `Ruta: ${req.originalUrl} - Metodo: ${req.method} - Ruta inexistente.`
            );
            res.redirect("/");
        } else {
            next();
        }
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});

export default router;
