// Importo dependencias de express
import express from "express";
import { logger } from "../log/logger.js";
import * as dotenv from "dotenv";
import { productosDao as productos } from "../daos/index.js";
const { Router } = express;
const router = Router();
dotenv.config();

router.get("/api/productos", async (req, res) => {
    res.status(200).json(await productos.GetAll());
});

router.get("/api/productos/:id", async (req, res) => {
    try {
        logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);
        const productoID = await productos.GetByID(req.params.id);
        if (productoID === undefined) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            res.status(200).json(productoID[0]);
        }
    } catch (error) {
        logger.error(`Error: ${error.message}`);
    }
});

router.post("/api/productos", async (req, res) => {
    if (process.env.ADMIN) {
        console.log("isAdmin: true - method allowed");

        const data = req.body;
        res.status(201).json(await productos.Save(data));
    } else {
        console.log("isAdmin: false - unauthorized");
        res.json({
            error: -1,
            descripcion: `Ruta ${req.baseUrl} - Método ${req.method} no autorizado`
        });
    }
});

router.put("/api/productos/:id", async (req, res) => {
    if (process.env.ADMIN) {
        console.log("isAdmin: true - method allowed");

        const productoID = await productos.GetByID(req.params.id);

        if (productoID === undefined) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            const updated = await productos.Update(req.params.id, req.body);
            res.status(202).json(updated);
        }
    } else {
        console.log("isAdmin: false - unauthorized");
        res.json({
            error: -1,
            descripcion: `Ruta ${req.baseUrl} - Método ${req.method} no autorizado`
        });
    }
});

router.delete("/api/productos/:id", async (req, res) => {
    if (process.env.ADMIN) {
        console.log("isAdmin: true - method allowed");

        const productoID = await productos.GetByID(req.params.id);

        if (productoID === undefined) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            const updated = await productos.DeleteById(req.params.id);
            res.status(202).json(updated);
        }
    } else {
        console.log("isAdmin: false - unauthorized");
        res.json({
            error: -1,
            descripcion: `Ruta ${req.baseUrl} - Método ${req.method} no autorizado`
        });
    }
});
export default router;
