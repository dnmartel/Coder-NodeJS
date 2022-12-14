// Importo dependencias de express
import express from "express";
const { Router } = express;
const router = Router();
import { logger } from "../log/logger.js";
import { faker } from "@faker-js/faker/locale/es";

export default router.get("/api/productos-test", (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        let data = { data: [] };
        for (let i = 0; i < 5; i++) {
            data.data.push({
                nombre: faker.commerce.product(),
                precio: faker.commerce.price(100, 500, 0),
                foto: faker.image.technics()
            });
        }
        res.render("./productosAzar.handlebars", data);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        res.send("Error", error);
    }
});
