import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
class ContenedorMemoria {
    constructor() {
        this.elementos = [];
    }

    GetByID(id) {
        const elem = this.elementos.find((elem) => elem.id == id);
        if (!elem) {
            throw new Error(`Error al listar: elemento no encontrado`);
        } else {
            return elem;
        }
    }

    GetAll() {
        return [...this.elementos];
    }

    Save(elem) {
        let newId;
        if (this.elementos.length == 0) {
            newId = 1;
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1;
        }

        const newElem = { ...elem, id: newId };
        this.elementos.push(newElem);
        return newElem;
    }

    Update(id, data) {
        const index = this.elementos.findIndex((p) => p.id == id);
        if (index == -1) {
            throw new Error(`Error al actualizar: elemento no encontrado`);
        } else {
            Object.assign(this.elementos[index], data);
            return this.elementos;
        }
    }

    DeleteById(id) {
        const index = this.elementos.findIndex((elem) => elem.id == id);
        if (index == -1) {
            throw new Error(`Error al borrar: elemento no encontrado`);
        } else {
            return this.elementos.splice(index, 1);
        }
    }

    DeleteAll() {
        this.elementos = [];
    }

    SaveProduct(obj, id) {
        try {
            const contenido = this.GetAll();
            const carrito = this.GetByID(id);

            obj.id = uuidv4();
            obj.timestamp = dayjs().format("DD/MM/YYYY HH:mm:ss");

            carrito.productos.push(obj);

            const carritoID = contenido.find((e) => e.id === id);
            Object.assign(carritoID, carrito);

            Object.assign(this.elementos, contenido);

            return carritoID;
        } catch (error) {
            throw new Error("😢 No se pudo guardar el objeto: " + error);
        }
    }

    async DeleteProdById(id, idProd) {
        if (id) {
            try {
                const contenido = await this.GetAll();

                const indexID = contenido.findIndex((item) => item.id === id);

                const prodIndexID = contenido[indexID].productos.findIndex(
                    (item) => item.id === idProd
                );
                contenido[indexID].productos.splice(prodIndexID, 1);

                Object.assign(this.elementos, contenido);
                return { eliminado: idProd };
            } catch (error) {
                throw new Error("😢 No se pudo leer el id: " + error);
            }
        } else {
            return null;
        }
    }
}

export default ContenedorMemoria;
