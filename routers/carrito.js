const express = require("express");
const { Router } = express;
const router = Router();
const isAdmin = require("../server.js");
const Carrito = require("../controller/carritoController");
const carrito = new Carrito("carrito.json");

router.post("/carrito", async (req, res) => {
    if (isAdmin) {
        console.log("isAdmin: true - method allowed");

        const data = req.body;
        res.status(201).json(await carrito.Save(data));
    } else {
        console.log("isAdmin: false - unauthorized");
        res.json({
            error: -1,
            descripcion: "Ruta /api/carrito - Método POST no autorizado"
        });
    }
});

router.delete("/carrito/:id", async (req, res) => {
    if (isAdmin) {
        console.log("isAdmin: true - method allowed");

        const carritoID = await carrito.GetByID(req.params.id);

        if (carritoID === undefined) {
            res.status(404).json({ error: "Carrito no encontrado" });
        } else {
            const updated = await carrito.DeleteById(req.params.id);
            res.status(202).json(updated);
        }
    } else {
        console.log("isAdmin: false - unauthorized");
        res.json({
            error: -1,
            descripcion: "Ruta /api/carrito - Método DELETE no autorizado"
        });
    }
});

router.get("/carrito/:id/productos", async (req, res) => {
    const carritoID = await carrito.GetByID(req.params.id);
    if (carritoID === undefined) {
        res.status(404).json({ error: "Carrito no encontrado" });
    } else {
        res.status(200).json(carritoID.productos);
    }
});

router.delete("/carrito/:id", async (req, res) => {
    if (isAdmin) {
        console.log("isAdmin: true - method allowed");

        const carritoID = await carrito.GetByID(req.params.id);

        if (carritoID === undefined) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            const updated = await carrito.DeleteById(req.params.id);
            res.status(202).json(updated);
        }
    } else {
        console.log("isAdmin: false - unauthorized");
        res.json({
            error: -1,
            descripcion: "Ruta /api/carrito - Método DELETE no autorizado"
        });
    }
});

module.exports = router;
