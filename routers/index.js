import { Router } from "express";
import loginRouter from "./login.js";
import productosRouter from "./productos.js";
import fakerRouter from "./faker.js";
import infoRouter from "./info.js";

const router = Router();

router.use("/", loginRouter, productosRouter, fakerRouter, infoRouter);

export default router;
