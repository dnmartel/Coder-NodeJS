import * as dotenv from 'dotenv' 
dotenv.config()
let productosDao;
let carritosDao;
console.log("TIPO DE PERSISTENCIA:", process.env.TIPO_PERSISTENCIA);
switch (process.env.TIPO_PERSISTENCIA) {
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
    case "mongo":
        const { default: ProductosDaoMongoDB } = await import(
            "./productos/ProductosDaoMongoDB.js"
        );
        const { default: CarritosDaoMongoDB } = await import(
            "./carritos/CarritosDaoMongoDB.js"
        );

        productosDao = new ProductosDaoMongoDB();
        carritosDao = new CarritosDaoMongoDB();
        break;
    case "firebase":
        const { default: ProductosDaoFirebase } = await import(
            "./productos/ProductosDaoFirebase.js"
        );
        const { default: CarritosDaoFirebase } = await import(
            "./carritos/CarritosDaoFirebase.js"
        );

        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
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
        break;
}

export { productosDao, carritosDao };
