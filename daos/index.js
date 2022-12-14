import * as dotenv from "dotenv";
import { logger } from "../log/logger.js";
dotenv.config();

let productosDao;
let mensajesDao;
let usuariosDao;
let carritosDao;

logger.info("TIPO DE PERSISTENCIA:", process.env.TIPO_PERSISTENCIA);
switch (process.env.TIPO_PERSISTENCIA) {
    case "mongo":
        const { default: ProductosDaoMongoDB } = await import(
            "./productos/ProductosDaoMongoDB.js"
        );
        const { default: MensajesDaoMongoDB } = await import(
            "./mensajes/MensajesDaoMongoDB.js"
        );
        const { default: UsuariosDaoMongoDB } = await import(
            "./usuarios/UsuariosDaoMongoDB.js"
        );
        const { default: CarritosDaoMongoDB } = await import(
            "./carritos/CarritosDaoMongoDB.js"
        );

        carritosDao = new CarritosDaoMongoDB();
        productosDao = new ProductosDaoMongoDB();
        mensajesDao = new MensajesDaoMongoDB();
        usuariosDao = new UsuariosDaoMongoDB();

        break;
    case "memoria":
        const { default: ProductosDaoMem } = await import(
            "./productos/ProductosDaoMem.js"
        );
        const { default: MensajesDaoMem } = await import(
            "./mensajes/MensajesDaoMem.js"
        );

        productosDao = new ProductosDaoMem();
        mensajesDao = new MensajesDaoMem();
        break;
}

export { productosDao, mensajesDao, usuariosDao, carritosDao };
