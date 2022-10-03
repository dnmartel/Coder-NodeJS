// Importo dependencias de express
const express = require("express");
const { Router } = express;
const router = Router();

// GET '/' -> devuelve el chat renderizado. - CHECKEADO
router.get("/chat", (req, res) => {
    res.render("chat", {});
});

module.exports = router;
