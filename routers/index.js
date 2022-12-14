import { Router } from "express";
import loginRouter from "./login.js";
import productosRouter from "./productos.js";
import fakerRouter from "./faker.js";
import infoRouter from "./info.js";
import randomsRouter from "./randoms.js";
import invalidRouter from "./invalid.js";

const router = Router();

router.use(
    "/",
    loginRouter,
    productosRouter,
    fakerRouter,
    infoRouter,
    randomsRouter,
    invalidRouter
);

export default router;
