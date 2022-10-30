import admin from "firebase-admin";
import { readFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const cert = JSON.parse(
    await readFile(
        new URL(
            "../db/ecommerce-node-634c3-firebase-adminsdk-1qrk7-364219ea78.json",
            import.meta.url
        )
    )
);

admin.initializeApp({
    credential: admin.credential.cert(cert)
});

console.log("Firebase conectado");

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
            console.log("[GetAll] Usuarios obtenidos con éxito! ->", response);
            return response;
        } catch (error) {
            console.error(
                "[GetAll] Ocurrio un error al intentar obtener usuarios  ->",
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
            console.log("[Save] Usuarios creados con éxito!");
            return obj;
        } catch (error) {
            console.error("[Save] Ocurrio un error ->", error.message);
        }
    }

    async SaveProduct(obj, id) {
        throw new Error("No implementado");
    }

    async GetByID(id) {
        try {
            const db = admin.firestore();
            const query = db.collection(this.collection);
            const doc = query.doc(id);
            const item = await doc.get();
            const response = item.data();
            if (response) {
                console.log(
                    `[GetByID] Usuario ${id} obtenido con éxito! ->`,
                    response
                );
                return response;
            } else {
                console.log(`[GetByID] Usuario ${id} no encontrado`);
            }
        } catch (error) {
            console.error(
                `[GetByID] Ocurrio un error al intenter obtener usuario ${id} ->`,
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
            console.log(`[updateById] Usuario ${id} actualizado con éxito!`);
            return updated;
        } catch (error) {
            console.error(
                `[updateById] Ocurrio un error al intentar actualizar usuario ${id} ->`,
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
            console.log(`[deleteById] Usuario ${id} eliminado con éxito!`);
            return deleted;
        } catch (error) {
            console.error(
                `[deleteById] Ocurrio un error al intentar eliminado usuario ${id} ->`,
                error.message
            );
        }
    }

    async DeleteProdById(id, idProd) {
        throw new Error("No implementado");
    }
}

export default ContenedorFirebase;
