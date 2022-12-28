import mongoose from "mongoose";
import config from "../config.js";
import { ObjectId } from 'mongodb'



await mongoose.connect(config.mongoDB.URI);

class ContenedorMongoDB {
    constructor(schema) {
        this.collection = schema;
    }

    async GetAll() {
        return await this.collection.find({});
    }

    async Save(obj) {
        return await this.collection.create(obj);
    }

    async SaveProduct(obj, id) {
        return await this.collection.updateOne(
            { _id: id },
            { $push: { productos: obj } }
        );
    }

    async GetByID(id) {
        return await this.collection.find({ _id: `${id}` });
    }

    async Update(id, data) {
        return await this.collection.findOneAndUpdate({ _id: `${id}` }, data, {
            new: true
        });
    }

    async DeleteById(id) {
        return await this.collection.deleteOne({ _id: id });
    }

    async DeleteProdById(id, idProd) {
        const objectId = new ObjectId(id)  
        return await this.collection.updateOne(
            { _id: objectId },
            { $pull: { productos: {  _id: `${idProd}` } } }
        );
    }
}

export default ContenedorMongoDB;
