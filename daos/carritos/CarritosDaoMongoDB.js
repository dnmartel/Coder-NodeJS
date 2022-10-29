import { Schema } from "mongoose";

import ContenedorMongoDB from "../../controller/ContenedorMongoDB.js";

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(
            "Carrito",
            new Schema({
                productos: { type: [], require: true },
                timestamp: {
                    type: Date,
                    default: () =>
                        new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
                    require: true
                }
            })
        );
    }

    /* async Save(carrito = { productos: [] }) {
        return super.Save(carrito);
    } */
}

export default CarritosDaoMongoDB;
