import { Router } from "express";
import loginRouter from "./login.js";
import productosRouter from "./productos.js";
import carritoRouter from "./carrito.js";
import invalidRouter from "./invalid.js";
import perfilRouter from "./perfil.js";
import notificarRouter from "./notificacion.js";

const router = Router();

router.use(
    "/",
    loginRouter,
    perfilRouter,
    productosRouter,
    carritoRouter,
    notificarRouter,
    invalidRouter
);

export default router;
