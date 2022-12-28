import express from "express";
import { logger } from "../log/logger.js";
const { Router } = express;
const router = Router();
import { carritosDao as carrito } from "../daos/index.js";

router.get("/carrito", async (req, res) => {
    const id = req.query.id;
    const email = req.session.email;
    const avatar = req.session.avatar;
    res.render("carrito", { id, email, avatar });
});

router.post("/api/carrito", async (req, res) => {
    logger.info("isAdmin: true - method allowed");
    const data = req.body;
    res.status(201).json(await carrito.Save(data));
});

router.delete("/api/carrito/:id", async (req, res) => {
    logger.info("isAdmin: true - method allowed");

    const carritoID = await carrito.GetByID(req.params.id);

    if (carritoID === undefined) {
        res.status(404).json({ error: "Carrito no encontrado" });
    } else {
        const updated = await carrito.DeleteById(req.params.id);
        res.status(202).json(updated);
    }
});

router.get("/api/carrito/:id/productos", async (req, res) => {
    const carritoID = await carrito.GetByID(req.params.id);
    if (carritoID === undefined) {
        res.status(404).json({ error: "Carrito no encontrado" });
    } else {
        res.status(200).json(carritoID.productos || carritoID[0].productos);
    }
});

router.post("/api/carrito/:id/productos", async (req, res) => {
    logger.info("isAdmin: true - method allowed");
    const carritoID = req.params.id;
    const data = req.body;
    res.status(201).json(await carrito.SaveProduct(data, carritoID));
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
