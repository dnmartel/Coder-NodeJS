import config from "../config.js";

/* let PERSISTENCIA = config.PERSISTENCIA.memoria; */
let PERSISTENCIA = config.PERSISTENCIA.json;
/* let PERSISTENCIA = config.PERSISTENCIA.mongo; */
/* let PERSISTENCIA = config.PERSISTENCIA.firebase; */

let productosDao;
let carritosDao;
console.log("TIPO DE PERSISTENCIA:", PERSISTENCIA);
switch (PERSISTENCIA) {
    case "json":
        const { default: ProductosDaoArchivo } = await import(
            "./productos/ProductosDaoArchivo.js"
        );
        const { default: CarritosDaoArchivo } = await import(
            "./carritos/CarritosDaoArchivo.js"
        );

        productosDao = new ProductosDaoArchivo();
        carritosDao = new CarritosDaoArchivo();
        break;
    case "mongodb":
        const { default: ProductosDaoMongoDB } = await import(
            "./productos/ProductosDaoMongoDB.js"
        );
        const { default: CarritosDaoMongoDB } = await import(
            "./carritos/CarritosDaoMongoDB.js"
        );

        productosDao = new ProductosDaoMongoDB();
        carritosDao = new CarritosDaoMongoDB();
        break;
    case "memoria":
        const { default: ProductosDaoMem } = await import(
            "./productos/ProductosDaoMem.js"
        );
        const { default: CarritosDaoMem } = await import(
            "./carritos/CarritosDaoMem.js"
        );

        productosDao = new ProductosDaoMem();
        carritosDao = new CarritosDaoMem();
}

export { productosDao, carritosDao };
