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
            table.string("nombre", 15).notNullable();
            table.string("descripcion", 50).notNullable();
            table.string("codigo", 10).notNullable();
            table.string("foto", 1000).notNullable();
            table.float("precio").notNullable();
            table.integer("stock").notNullable();
            table.primary("id");
        });
        console.log(`Tabla ${table} creada.`);
    } catch (error) {
        console.error(error.message);
    } finally {
        knexInstance.destroy();
    }
}

createTableSQLite3("productos");

class ProductosDaoSQL extends ContenedorSQL {
    constructor() {
        super(config.sqlite3, "productos");
    }
}

export default ProductosDaoSQL;
