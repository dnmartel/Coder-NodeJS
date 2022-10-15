import knex from "knex";

export default class Productos {
    constructor(options, table) {
        this.options = options;
        this.table = table;
    }

    async GetAll() {
        const knexInstance = knex(this.options);
        try {
            const rows = await knexInstance(this.table).select("*");
            console.log("Productos encontrados:", rows.length);
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            knexInstance.destroy();
        }
    }

    /* GetByID(id) {
        return this.productos.find((e) => e.id === Number(id));
    } */

    async Save(products) {
        const knexInstance = knex(this.options);
        try {
            await knexInstance(this.table).insert(products);
            console.log("Productos creados con exito");
        } catch (error) {
            console.error(error);
        } finally {
            knexInstance.destroy();
        }
    }

    /* Update(id, data) {
        const productoID = this.productos.find((e) => e.id === Number(id));
        Object.assign(productoID, data);
        return productoID;
    } */
    async Update(data, conditons) {
        const knexInstance = knex(this.options);
        try {
            await knexInstance(this.table).update(data).where(conditons);
            console.log("productos editados");
        } catch (error) {
            console.error(error.message);
        } finally {
            knexInstance.destroy();
        }
    }

    async Delete(conditions) {
        const knexInstance = knex(this.options);
        try {
            if (conditions) {
                await knexInstance.from(this.table).del().where(conditions);
            } else {
                await knexInstance.from(this.table).del();
            }
            console.log("productos eliminados");
        } catch (error) {
            console.error(error.message);
        } finally {
            knexInstance.destroy();
        }
    }
}
