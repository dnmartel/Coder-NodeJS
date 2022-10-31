import { Schema } from "mongoose";

import ContenedorMongoDB from "../../controller/ContenedorMongoDB.js";

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(
            "Carrito",
            new Schema({
                timestamp: {
                    type: Date,
                    default: () =>
                        new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
                    require: true
                },
                productos: { type: [], require: true }
            })
        );
    }
}

export default CarritosDaoMongoDB;
