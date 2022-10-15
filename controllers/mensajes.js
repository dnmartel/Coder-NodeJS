import knex from "knex";

export default class Mensajes {
    constructor(options, table) {
        this.options = options;
        this.table = table;
    }

    async GetAll() {
        const knexInstance = knex(this.options);
        try {
            const rows = await knexInstance(this.table).select("*");
            console.log("Mensajes encontrados:", rows.length);
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            knexInstance.destroy();
        }
    }

    async Save(obj) {
        const knexInstance = knex(this.options);
        try {
            await knexInstance(this.table).insert(obj);
            console.log("Mensaje guardado con exito");
        } catch (error) {
            console.error(error);
        } finally {
            knexInstance.destroy();
        }
    }
}
