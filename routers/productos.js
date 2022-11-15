// Importo dependencias de express
import express from "express";
const { Router } = express;
const router = Router();
// GET '/' -> devuelve la vista renderizada.
router.get("/productos", (req, res) => {
    if (req.session.logged) {
        const username = req.session.username;
        res.render("./productos.handlebars", { username });
    } else {
        res.redirect("./login");
    }
});

export default router;
