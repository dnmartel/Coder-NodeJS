
export default class Productos {
    constructor() {
        this.productos = [];
    }

    GetAll() {
        return this.productos;
    }

    GetByID(id) {
        return this.productos.find((e) => e.id === Number(id));
    }

    Save(objeto) {
        if (this.productos.length === 0) {
            objeto.id = 1;
        } else {
            objeto.id = this.productos[this.productos.length - 1].id + 1;
        }
        this.productos.push(objeto);
        return objeto;
    }

    Update(id, data) {
        const productoID = this.productos.find((e) => e.id === Number(id));
        Object.assign(productoID, data);
        return productoID;
    }

    Delete(id) {
        const toDelete = this.GetByID(id);
        this.productos.splice(this.productos.indexOf(toDelete), 1);
    }
}
