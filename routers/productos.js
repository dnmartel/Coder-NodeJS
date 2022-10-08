// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();
const isAdmin = require("../server.js");
const Productos = require("../controller/productosController");
const productos = new Productos("productos.json");

// GET '/' -> devuelve la vista renderizada.
router.get("/productos", async (req, res) => {
    if (isAdmin) {
        console.log("isAdmin: true");
        console.log("Productos:", await productos.GetAll());
        res.json(await productos.GetAll());
    } else {
        console.log("isAdmin: false");
        console.log("Productos:", await productos.GetAll());
        res.json(await productos.GetAll());
    }
});

router.get("/productos/:id", async (req, res) => {
    if (isAdmin) {
        console.log(req.params.id);
        console.log("isAdmin: true");
        console.log("Productos:", await productos.GetByID(req.params.id));
        res.json(await productos.GetByID(req.params.id));
    } else {
        console.log("isAdmin: false");
        console.log("Productos:", await productos.GetAll());
        res.json(await productos.GetAll());
    }
});

router.post("/productos", async (req, res) => {
    if (isAdmin) {
        console.log("isAdmin: true");
        console.log("Productos:", await productos.GetAll());
        res.json(await productos.GetAll());
    } else {
        console.log("isAdmin: false");
        res.json({
            error: -1,
            descripcion: "Ruta /api/productos - Método GET no autorizado"
        });
    }
});

router.put("/productos/:id", (req, res) => {
    console.log("productos");
    res.json({ productos: "productos" });
});

router.delete("/productos/:id", (req, res) => {
    console.log("productos");
    res.json({ productos: "productos" });
});

module.exports = router;
