import ContenedorSQL from "../../controller/ContenedorSQL.js";
import config from "../../config.js";
import knex from "knex";
async function createTableSQLite3(table) {
    const knexInstance = knex(config.sqlite3);
    try {
        const exist = await knexInstance.schema.hasTable(table);
        if (exist) {
            console.log(`La tabla ${table} ya existe.`);
            return;
        }
        await knexInstance.schema.createTable(table, (table) => {
            table.increments("id").notNullable();
            table.timestamp("timestamp");
            table.primary("id");
        });
        console.log(`Tabla ${table} creada.`);
    } catch (error) {
        console.error(error.message);
    } finally {
        knexInstance.destroy();
    }
}
createTableSQLite3("carritos");

class CarritosDaoSQL extends ContenedorSQL {
    constructor() {
        super(config.sqlite3, "carritos");
    }
    GetAll() {
        return { error: "No implementado" };
    }

    GetByID() {
        return undefined;
    }

    Save() {
        return { error: "No implementado" };
    }

    SaveProduct() {
        return { error: "No implementado" };
    }

    DeleteById() {
        return undefined;
    }
}

export default CarritosDaoSQL;
