import mongoose, { Schema } from "mongoose";

const usersModel = new Schema(
    {
        password: { type: String, require: true },
        email: {
            type: String,
            require: true,
            unique: true,
            index: true,
            validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        },
        name: {
            type: String,
            require: true
        },
        address: {
            type: String,
            require: true
        },
        age: {
            type: Number,
            require: true
        },
        phone: {
            type: String,
            require: true
        },
        avatar: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Usuarios", usersModel);
