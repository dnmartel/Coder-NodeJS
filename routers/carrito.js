import express from "express";
import { logger } from "../log/logger.js";
import { carritosDao as carrito } from "../daos/index.js";
const { Router } = express;
const router = Router();

router.get("/carrito", async (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        const id = req.query.id;
        const email = req.session.email;
        const avatar = req.session.avatar;
        const name = req.session.name;
        const phone = req.session.phone;
        res.render("carrito", { id, email, avatar, name, phone });
    } catch (error) {
        logger.error(error);
    }
});

router.post("/api/carrito", async (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        const data = req.body;
        res.status(201).json(await carrito.Save(data));
    } catch (error) {
        logger.error(error);
    }
});

router.delete("/api/carrito/:id", async (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        const carritoID = await carrito.GetByID(req.params.id);

        if (carritoID === undefined) {
            res.status(404).json({ error: "Carrito no encontrado" });
        } else {
            const updated = await carrito.DeleteById(req.params.id);
            res.status(202).json(updated);
        }
    } catch (error) {
        logger.error(error);
    }
});

router.get("/api/carrito/:id/productos", async (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        const carritoID = await carrito.GetByID(req.params.id);
        if (carritoID === undefined) {
            logger.error(
                `Ruta: ${req.originalUrl} - Metodo: ${req.method} - "Carrito no encontrado"`
            );
            res.status(404).json({ error: "Carrito no encontrado" });
        } else {
            res.status(200).json(carritoID.productos || carritoID[0].productos);
        }
    } catch (error) {
        logger.error(error);
    }
});

router.post("/api/carrito/:id/productos", async (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        const carritoID = req.params.id;
        const data = req.body;
        res.status(201).json(await carrito.SaveProduct(data, carritoID));
    } catch (error) {
        logger.error(error);
    }
});

router.delete("/api/carrito/:id/productos/:id_prod", async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
    try {
        logger.info(req.params.id);
        logger.info(req.params.id_prod);
        const updated = await carrito.DeleteProdById(
            req.params.id,
            req.params.id_prod
        );
        res.status(202).json(updated);
    } catch (error) {
        logger.error(error);
    }
});

export default router;
