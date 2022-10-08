// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();

// GET '/' -> devuelve el carrito renderizado. - CHECKEADO

router.post("/carrito", (req, res) => {
    console.log("carrito");
    res.send.json({ carrito: "carrito" });
});

router.delete("/carrito/:id", (req, res) => {
    console.log("carrito");
    res.send.json({ carrito: "carrito" });
});

router.get("/carrito/:id/productos", (req, res) => {
    console.log("carrito");
    res.send.json({ carrito: "carrito" });
});

router.post("/carrito/productos", (req, res) => {
    console.log("carrito");
    res.send.json({ carrito: "carrito" });
});

router.delete("/carrito/:id/productos/:id_prod", (req, res) => {
    console.log("carrito");
    res.send.json({ carrito: "carrito" });
});

module.exports = router;
