// Importo dependencias de express
import express from "express";
const { Router } = express;
const router = Router();
import { faker } from "@faker-js/faker/locale/es";

// GET '/' -> devuelve la vista renderizada.
export default router.get("/api/productos-test", (req, res) => {
    try {
        let data = { data: [] };

        for (let i = 0; i < 5; i++) {
            data.data.push({
                nombre: faker.commerce.product(),
                precio: faker.commerce.price(100, 500, 0),
                foto: faker.image.technics()
            });
        }
        res.render("./productosAzar.handlebars", data);
    } catch (error) {
        res.send("Error", error);
    }
});
