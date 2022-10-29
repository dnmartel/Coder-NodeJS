import { Schema } from "mongoose";

import ContenedorMongoDB from "../../controller/ContenedorMongoDB.js";

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        console.log("ProductosDaoMongoDB Here");
        super(
            "Producto",
            new Schema({
                nombre: { type: String, require: true },
                descripcion: { type: String, require: true },
                codigo: { type: String, require: true },
                foto: { type: String, require: true },
                precio: { type: Number, require: true },
                stock: {
                    default: () =>
                        new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
                    require: true
                },
                timestamp: { type: new Date(), require: true }
            })
        );
    }
}

export default ProductosDaoMongoDB;
