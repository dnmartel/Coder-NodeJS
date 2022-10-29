import express from "express";
const { Router } = express;
const router = Router();

router.get("*", (req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: `Ruta ${req.baseUrl} - Método ${req.method} no implementado`
    });
});

export default router;
