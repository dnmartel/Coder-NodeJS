import mongoose, { Schema } from "mongoose";

const carritoModel = new Schema({
    productos: { type: [], require: true },
    timestamp: {
        type: Date,
        default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
        require: true
    }
});

export default mongoose.model("Carrito", carritoModel);
