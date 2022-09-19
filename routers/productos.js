// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();
const Productos = require("../modules/productos");

// Importo el contendor e inicializo un nuevo archivo - OPCIONAL
/* const Contenedor = require("../modules/contenedor");
const datosContenedor = new Contenedor("productos.txt"); */

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

// GET '/api/productos' -> devuelve todos los productos. - CHECKEADO
router.get("/", (req, res) => {
    res.status(200).json(productos.GetAll());
});

// GET '/api/productos/:id' -> devuelve un producto según su id. - CHECKEADO
router.get("/:id", (req, res) => {
    const productoID = productos.GetByID(req.params.id);

    if (productoID === undefined) {
        res.status(404).json({ error: "Producto no encontrado" });
    } else {
        res.status(200).json(productoID);
    }
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado. - CHECKEADO
router.post("/", (req, res) => {
    const data = req.body;
    res.status(201).json(productos.Save(data));
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put("/:id", (req, res) => {
    const productoID = productos.GetByID(req.params.id);

    if (productoID === undefined) {
        res.status(404).json({ error: "Producto no encontrado" });
    } else {
        const updated = productos.Update(req.params.id, req.body);
        res.status(202).json(updated);
    }
});

// DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:id", (req, res) => {
    const productoID = productos.GetByID(req.params.id);
    console.log(productoID);
    if (productoID === undefined) {
        res.status(404).json({ error: "Producto no encontrado" });
    } else {
        productos.Delete(req.params.id);
        res.status(200).json("Objeto borrado");
    }
});

module.exports = router;
