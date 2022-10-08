// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();
const isAdmin = require("../server.js");

// GET '/' -> devuelve la vista renderizada.
router.get("/productos", (req, res) => {
    if (isAdmin) {
        console.log("productos");
        res.json({ productos: "productos" });
    } else {
        console.log("false");
        res.json({
            error: -1,
            descripcion: "Ruta /api/productos - Método GET no autorizado"
        });
    }
});

router.get("/productos/:id", (req, res) => {
    console.log("productos");
    res.json({ productos: "productos" });
});

router.post("/productos", (req, res) => {
    console.log("productos");
    res.json({ productos: "productos" });
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
