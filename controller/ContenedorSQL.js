import knex from "knex";

class ContenedorSQL {
    constructor(options, table) {
        this.options = options;
        this.table = table;
    }

    async GetAll() {
        const knexInstance = knex(this.options);
        try {
            const rows = await knexInstance(this.table).select("*");
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            knexInstance.destroy();
        }
    }

    async GetByID(id) {
        const knexInstance = knex(this.options);
        try {
            const rows = await knexInstance(this.table)
                .select("*")
                .where("id", id);
            return rows;
        } catch (error) {
            console.error(error.message);
        } finally {
            knexInstance.destroy();
        }

        return this.productos.find((e) => e.id === Number(id));
    }

    async Save(products) {
        const knexInstance = knex(this.options);
        try {
            await knexInstance(this.table).insert(products);
            return products;
        } catch (error) {
            console.error(error);
        } finally {
            knexInstance.destroy();
        }
    }

    async Update(id, data) {
        const knexInstance = knex(this.options);
        try {
            await knexInstance(this.table).where({ id: id }).update(data);
            return data;
        } catch (error) {
            console.error(error.message);
        } finally {
            knexInstance.destroy();
        }
    }

    async DeleteById(id) {
        const knexInstance = knex(this.options);
        try {
            if (id) {
                await knexInstance.from(this.table).del().where({ id: id });
                return { deleted: id };
            } else {
                await knexInstance.from(this.table).del();
                return { deleted: "All" };
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            knexInstance.destroy();
        }
    }
}

export default ContenedorSQL;
