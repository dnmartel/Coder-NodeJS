import express from "express";
const { Router } = express;
const router = Router();
import * as dotenv from 'dotenv' 
dotenv.config()
import { productosDao as productos } from "../daos/index.js";

router.get("/productos", async (req, res) => {
    res.status(200).json(await productos.GetAll());
});

router.get("/productos/:id", async (req, res) => {
    const productoID = await productos.GetByID(req.params.id);

    if (productoID === undefined) {
        res.status(404).json({ error: "Producto no encontrado" });
    } else {
        res.status(200).json(productoID);
    }
});

router.post("/productos", async (req, res) => {
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

router.put("/productos/:id", async (req, res) => {
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

router.delete("/productos/:id", async (req, res) => {
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
