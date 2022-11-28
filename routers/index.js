import { Router } from "express";
import loginRouter from "./login.js";
import productosRouter from "./productos.js";
import testRouter from "./test.js";
import infoRouter from "./info.js";

const router = Router();

router.use("/", loginRouter, productosRouter, testRouter, infoRouter);

export default router;
