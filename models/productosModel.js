import mongoose, { Schema } from "mongoose";

const productsModel =  new Schema({
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

export default mongoose.model("Productos", productsModel);
