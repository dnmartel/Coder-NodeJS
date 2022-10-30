import admin from "firebase-admin";
import { readFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import config from "../config.js";

const cert = JSON.parse(
    await readFile(new URL(config.firebase.URI, import.meta.url))
);
admin.initializeApp({
    credential: admin.credential.cert(cert)
});

class ContenedorFirebase {
    constructor(collection) {
        this.collection = collection;
    }

    async GetAll() {
        try {
            const db = admin.firestore();
            const query = db.collection(this.collection);
            const querySnapshot = await query.get();
            const response = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            return response;
        } catch (error) {
            console.error(
                "[GetAll] Ocurrio un error al intentar obtener datos ->",
                error.message
            );
        }
    }

    async Save(obj) {
        try {
            const db = admin.firestore();
            const query = db.collection(this.collection);
            let id = uuidv4();
            let doc = query.doc(id);
            await doc.create(obj);
            return obj;
        } catch (error) {
            console.error("[Save] Ocurrio un error ->", error.message);
        }
    }

    async SaveProduct(obj, id) {
        try {
            const db = admin.firestore();
            const query = db.collection(this.collection);
            const doc = query.doc(id);
            let temp = [];
            let productos = await doc.get();
            temp = productos.data().productos;
            temp.push(obj);
            await doc.update("productos", temp);
            return { "Producto agregado": obj };
        } catch (error) {
            console.error(
                `[updateById] Ocurrio un error al intentar actualizar ${id} ->`,
                error.message
            );
        }
    }

    async GetByID(id) {
        try {
            const db = admin.firestore();
            const query = db.collection(this.collection);
            const doc = query.doc(id);
            const item = await doc.get();
            const response = item.data();
            if (response) {
                console.log(`[GetByID] ${id} obtenido con éxito! ->`, response);
                return response;
            } else {
                console.log(`[GetByID] ${id} no encontrado`);
            }
        } catch (error) {
            console.error(
                `[GetByID] Ocurrio un error al intenter obtener ${id} ->`,
                error.message
            );
        }
    }

    async Update(id, data) {
        try {
            const db = admin.firestore();
            const query = db.collection(this.collection);
            const doc = query.doc(id);
            const updated = await doc.update(data);
            return updated;
        } catch (error) {
            console.error(
                `[updateById] Ocurrio un error al intentar actualizar ${id} ->`,
                error.message
            );
        }
    }

    async DeleteById(id) {
        try {
            const db = admin.firestore();
            const query = db.collection(this.collection);
            const doc = query.doc(id);
            const deleted = await doc.delete();
            console.log(`[deleteById] ${id} eliminado con éxito!`);
            return deleted;
        } catch (error) {
            console.error(
                `[deleteById] Ocurrio un error al intentar eliminado ${id} ->`,
                error.message
            );
        }
    }

    async DeleteProdById(id, idProd) {
        const db = admin.firestore();
        const query = db.collection(this.collection);
        const doc = query.doc(id);
        let productos = await doc.get();
        productos = productos
            .data()
            .productos.filter((prod) => (prod.id || prod._id) !== idProd);
        await query.doc(id).update("productos", productos);
        return { eliminado: idProd };
    }
}

export default ContenedorFirebase;
