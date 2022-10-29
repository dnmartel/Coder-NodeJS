import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongoDB.URI);

class ContenedorMongoDB {
    constructor(modelName, schema) {
        this.collection = mongoose.model(modelName, schema);
    }

    async GetAll() {
        return this.collection.find({});
    }

    async Save(obj) {
        const result = await this.collection.create(obj);
        return result;
    }

    async SaveProduct(obj, id) {
        throw new Error("No implementado");
    }

    async GetByID(id) {
        throw new Error("No implementado");
    }

    async Update(id, data) {
        throw new Error("No implementado");
    }

    async DeleteById(id) {
        throw new Error("No implementado");
    }

    async DeleteProdById(id, idProd) {}
}

export default ContenedorMongoDB;
