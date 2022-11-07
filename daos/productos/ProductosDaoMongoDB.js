import { Schema } from "mongoose";

import ContenedorMongoDB from "../../controllers/ContenedorMongoDB.js";

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(
            "Producto",
            new Schema({
                nombre: { type: String, require: true },
                descripcion: { type: String, require: true },
                codigo: { type: String, require: true },
                foto: { type: String, require: true },
                precio: { type: Number, require: true },
                stock: { type: Number, require: true },
                timestamp: {
                    type: Date,
                    default: () =>
                        new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
                    require: true
                }
            })
        );
    }
}

export default ProductosDaoMongoDB;
