import * as dotenv from "dotenv";
dotenv.config();
let productosDao;
let mensajesDao;
console.log("TIPO DE PERSISTENCIA:", process.env.TIPO_PERSISTENCIA);
switch (process.env.TIPO_PERSISTENCIA) {
    case "mongo":
        const { default: ProductosDaoMongoDB } = await import(
            "./productos/ProductosDaoMongoDB.js"
        );
        const { default: MensajesDaoMongoDB } = await import(
            "./mensajes/MensajesDaoMongoDB.js"
        );

        productosDao = new ProductosDaoMongoDB();
        mensajesDao = new MensajesDaoMongoDB();
        break;
    case "firebase":
        const { default: ProductosDaoFirebase } = await import(
            "./productos/ProductosDaoFirebase.js"
        );
        const { default: MensajesDaoFirebase } = await import(
            "./mensajes/MensajesDaoFirebase.js"
        );

        productosDao = new ProductosDaoFirebase();
        mensajesDao = new MensajesDaoFirebase();
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

export { productosDao, mensajesDao };
