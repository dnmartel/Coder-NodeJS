import { Schema } from "mongoose";

import ContenedorMongoDB from "../../controllers/ContenedorMongoDB.js";

class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(
            "Mensajes",
            new Schema({
                author: {
                    email: { type: String, require: true },
                    nombre: { type: String, require: true },
                    apellido: { type: String, require: true },
                    edad: { type: Number, require: true },
                    alias: { type: String, require: true },
                    avatar: { type: String, require: true }
                },
                text: { type: String, require: true },
                timestamp: { type: String, require: true }
            })
        );
    }
}

export default MensajesDaoMongoDB;
