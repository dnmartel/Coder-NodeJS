// Importo dependencias de express
import express from "express";
const { Router } = express;
const router = Router();
// GET '/' -> devuelve la vista renderizada.

router.get("/", (req, res) => {
    try {
        res.redirect("./login");
    } catch (error) {
        res.send("Error");
    }
});
router.get("/login", (req, res) => {
    try {
        if (req.session.logged) {
            console.log(`Usuario con sesión activa -> ${req.session.username}`);
            res.redirect("./productos");
        } else {
            res.render("./login.handlebars");
        }
    } catch (error) {
        res.send("Error");
    }
});

router.post("/login", (req, res) => {
    const { username } = req.body;
    req.session.username = username;
    req.session.logged = true;
    res.redirect("./login");
});

router.get("/logout", (req, res) => {
    try {
        const username = req.session.username;
        req.session.destroy();
        res.render("./logout.handlebars", { username });
    } catch (error) {
        res.send("Ha ocurrido un error", error.message);
    }
});

export default router;
