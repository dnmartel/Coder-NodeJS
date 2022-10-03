// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();

// GET '/' -> devuelve la vista renderizada.
router.get("/", (req, res) => {
    res.render("index", {});
});

module.exports = router;
