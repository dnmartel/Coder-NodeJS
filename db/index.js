import knex from "knex";

export const optionsMySQL = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "coder",
        password: "coder",
        database: "ecommerce"
    }
};

export const optionsSQLite3 = {
    client: "sqlite3",
    connection: {
        filename: "./db/ecommerce.sqlite"
    },
    useNullAsDefault: true
};

export async function createTableMySQL(table) {
    const knexInstance = knex(optionsMySQL);
    try {
        const exist = await knexInstance.schema.hasTable(table);
        if (exist) {
            console.log(`La tabla ${table} ya existe.`);
            return;
        }
        await knexInstance.schema.createTable(table, (table) => {
            table.increments("id").notNullable();
            table.string("nombre", 15).notNullable();
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

export async function createTableSQLite3(table) {
    const knexInstance = knex(optionsSQLite3);
    try {
        const exist = await knexInstance.schema.hasTable(table);
        if (exist) {
            console.log(`La tabla ${table} ya existe.`);
            return;
        }
        await knexInstance.schema.createTable(table, (table) => {
            table.increments("id").notNullable();
            table.string("message", 140).notNullable();
            table.string("email", 45).notNullable();
            table.string("timestamp", 25).notNullable();
        });
        console.log(`Tabla ${table} creada.`);
    } catch (error) {
        console.error(error.message);
    } finally {
        knexInstance.destroy();
    }
}
