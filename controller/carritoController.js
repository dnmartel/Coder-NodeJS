const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");

class Carrito {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    async Save(obj) {
        try {
            const contenido = await this.GetAll();

            obj.id = uuidv4();
            obj.timestamp = dayjs().format("DD/MM/YYYY HH:mm:ss");

            contenido.push(obj);

            await fs.promises.writeFile(
                `./db/${this.nombreArchivo}`,
                JSON.stringify(contenido, null, 2)
            );
            return obj.id;
        } catch (error) {
            console.log("😢 No se pudo guardar el objeto: " + error);
        }
    }

    async GetByID(id) {
        if (id) {
            try {
                const contenido = await this.GetAll();

                return contenido.find((e) => e.id === id);
            } catch (error) {
                console.log("😢 No se pudo leer el id: " + error);
            }
        } else {
            return null;
        }
    }

    async GetAll() {
        try {
            const contenidoArchivo = await fs.promises.readFile(
                `./db/${this.nombreArchivo}`,
                "utf-8"
            );

            return JSON.parse(contenidoArchivo);
        } catch (error) {
            return [];
        }
    }

    async Update(id, data) {
        const contenido = await this.GetAll();
        const productoID = contenido.find((e) => e.id === id);
        Object.assign(productoID, data);

        await fs.promises.writeFile(
            `./db/${this.nombreArchivo}`,
            JSON.stringify(contenido, null, 2)
        );

        return productoID;
    }

    async DeleteById(id) {
        if (id) {
            try {
                const contenido = await this.GetAll();

                const indexID = contenido.findIndex((item) => item.id === id);

                contenido.splice(indexID, 1);

                await fs.promises.writeFile(
                    `./db/${this.nombreArchivo}`,
                    JSON.stringify(contenido, null, 2)
                );
                return { eliminado: id };
            } catch (error) {
                console.log("😢 No se pudo leer el id: " + error);
            }
        } else {
            return null;
        }
    }

    async DeleteAll() {
        try {
            await fs.promises.writeFile(`./db/${this.nombreArchivo}`, "[]");
            return "Todos los elementos borrados";
        } catch (error) {
            console.log(
                `\n😢 No se pudo borrar el contenido de: "${this.nombreArchivo}":\n ${error} \n\n`
            );
        }
    }
}

module.exports = Carrito;
