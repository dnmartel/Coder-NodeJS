// Importo dependencias de express
import { Router } from "express";
import { logger } from "../log/logger.js";
import os from "os";

const router = Router();
router.get("/info", (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        res.render("./info.handlebars", {
            argv: process.argv.slice(2),

            platform: process.platform,

            path: process.execPath,

            pid: process.pid,

            nodev: process.version,

            cwd: process.cwd(),

            rss: process.memoryUsage().rss,

            cores: os.cpus().length
        });
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});
/* router.get("/info", (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            logger.warn(
                `Ruta: ${req.originalUrl} - Metodo: ${req.method} - Intento de acceso sin login.`
            );
            res.render("login");
        } else {
            logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
            res.render("./info.handlebars", {
                argv: process.argv.slice(2),
    
                platform: process.platform,
    
                path: process.execPath,
    
                pid: process.pid,
    
                nodev: process.version,
    
                cwd: process.cwd(),
    
                rss: process.memoryUsage().rss,
    
                cores: os.cpus().length
            });
        }
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
    
}); */

export default router;
