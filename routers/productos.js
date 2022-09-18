// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();

// Importo el contendor e inicializo un nuevo archivo - OPCIONAL
/* const Contenedor = require("../modules/contenedor");
const datosContenedor = new Contenedor("productos.txt"); */

// Inicializo un array de productos en memoria
const productos = [
    {
        title: "Perro",
        price: 300.45,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },
    {
        title: "Escuadra2",
        price: 123.49,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 2
    },
    {
        title: "Escuadra",
        price: 123.49,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 3
    },
    {
        title: "Calculadora",
        price: 234.56,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 4
    },
    {
        title: "Regla",
        price: 223.25,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 5
    },
    {
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 6
    }
];

// GET '/api/productos' -> devuelve todos los productos.
router.get("/", (req, res) => {
    res.status(200).json(productos);
});

// GET '/api/productos/:id' -> devuelve un producto según su id.
router.get("/:id", (req, res) => {
    if (productos[Number(req.params.id) - 1] === undefined) {
        res.status(404).json({ error: "Producto no encontrado" });
    } else {
        res.status(200).json(productos[Number(req.params.id) - 1]);
    }
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post("/", (req, res) => {
    const data = req.body;
    // Asigno ID 1 si no tiene contenido, sino, 1 más que el último
    if (productos.length === 0) {
        data.id = 1;
    } else {
        data.id = productos[productos.length - 1].id + 1;
    }
    // Pusheo el objeto al array
    productos.push(data);
    res.status(201).json(data);
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put("/:id", (req, res) => {
    if (productos[Number(req.params.id) - 1] === undefined) {
        res.status(404).json({ error: "Producto no encontrado" });
    } else {
        const id = Number(req.params.id);
        const data = req.body;
        Object.assign(productos[id - 1], data);
        res.status(202).json(productos[id - 1]);
    }
});

// DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:id", (req, res) => {
    if (productos[Number(req.params.id) - 1] === undefined) {
        res.status(404).json({ error: "Producto no encontrado" });
    } else {
        const id = req.params.id;
        productos.splice(id - 1, 1);
        res.status(200).json("Objeto borrado");
    }
});

// EXTRA - Devuelve un producto random
router.get("/random", (req, res) => {
    const randBetween = Math.floor(Math.random() * productos.length) + 1;

    res.json(productos(randBetween));
});

module.exports = router;
