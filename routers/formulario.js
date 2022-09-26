// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();

// GET '/' -> devuelve el formulario renderizado. - CHECKEADO
router.get("/", (req, res) => {
    res.render("formulario", {});
});

module.exports = router;
