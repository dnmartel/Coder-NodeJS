// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();

// GET '/' -> devuelve la vista renderizada.
router.get("/", (req, res) => {
    try {
        res.send("index");
    } catch (error) {
        res.send("Error");
    }
});

module.exports = router;
