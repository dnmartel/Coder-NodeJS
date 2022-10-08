const express = require("express");
const { Router } = express;
const router = Router();
const Carrito = require("../controller/carritoController");
const carrito = new Carrito("carrito.json");

router.post("/carrito", async (req, res) => {
    console.log("isAdmin: true - method allowed");

    const data = req.body;
    res.status(201).json(await carrito.Save(data));
});

router.delete("/carrito/:id", async (req, res) => {
    console.log("isAdmin: true - method allowed");

    const carritoID = await carrito.GetByID(req.params.id);

    if (carritoID === undefined) {
        res.status(404).json({ error: "Carrito no encontrado" });
    } else {
        const updated = await carrito.DeleteById(req.params.id);
        res.status(202).json(updated);
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

router.post("/carrito/:id/productos", async (req, res) => {
    console.log("isAdmin: true - method allowed");
    const carritoID = req.params.id;
    const data = req.body;
    res.status(201).json(await carrito.SaveProduct(data, carritoID));
});

router.delete("/carrito/:id/productos/:id_prod", async (req, res) => {
    const carritoID = await carrito.GetByID(req.params.id);

    if (carritoID === undefined) {
        res.status(404).json({ error: "Carrito no encontrado" });
    } else {
        const updated = await carrito.DeleteProdById(
            req.params.id,
            req.params.id_prod
        );
        res.status(202).json(updated);
    }
});

module.exports = router;
