// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();
const Productos = require("../modules/productos");

// Inicializo un array de productos en memoria, basado en clase
const productos = new Productos();

// Defino y pusheo productos de prueba
const base = [
    {
        title: "Perro",
        price: 500.45,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    },
    {
        title: "Regla",
        price: 123.49,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    },
    {
        title: "Escuadra",
        price: 321.14,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    }
];

base.forEach((e) => {
    productos.Save(e);
});

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
