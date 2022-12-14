import { Router } from "express";
import { fork } from "child_process";
import { logger } from "../log/logger.js";

const router = Router();

router.get("/api/randoms", (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        const input = req.query.cant || 100000000;
        const random = fork("./random.js", [input]);
        random.on("message", (data) => {
            random.send("OK");
            res.json(data);
        });
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});

export default router;
