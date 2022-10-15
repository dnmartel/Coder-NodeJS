// Importo dependencias de express
import express from "express";
const { Router } = express;
const router = Router();

// GET '/' -> devuelve la vista renderizada.
export default router.get("/", (req, res) => {
    try {
        res.send("index");
    } catch (error) {
        res.send("Error");
    }
});
