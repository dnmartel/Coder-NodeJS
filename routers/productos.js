// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();
const Productos = require("../modules/productos");

// Inicializo un array de productos en memoria, basado en clase
const productos = new Productos();

// GET '/productos' -> devuelve todos los productos. - CHECKEADO
router.get("/productos", (req, res) => {
    const data = productos.GetAll();
    res.render("productos", { data });
});

// POST '/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado. - CHECKEADO
router.post("/productos", (req, res) => {
    const data = req.body;
    productos.Save(data);
    res.redirect("/");
});

module.exports = router;
