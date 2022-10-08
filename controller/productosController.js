const fs = require("fs");

class Productos {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async Save(obj) {
        try {
            // Traigo el contenido del archivo y lo parseo
            const contenido = await this.GetAll();
            // Asigno ID 1 si no tiene contenido, sino, 1 más que el último
            if (contenido.length === 0) {
                obj.id = 1;
            } else {
                obj.id = contenido[contenido.length - 1].id + 1;
            }
            // Pusheo el objeto al array
            contenido.push(obj);
            // Escribo el objeto
            await fs.promises.writeFile(
                `./${this.nombreArchivo}`,
                JSON.stringify(contenido, null, 2)
            );

            return (
                " Objeto guardado correctamente 😁",
                `\n Ruta del archivo: ./${this.nombreArchivo}\n`,
                obj
            );
        } catch (error) {
            console.log("😢 No se pudo guardar el objeto: " + error);
        }
    }

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async GetByID(id) {
        if (id) {
            try {
                // Traigo el contenido del archivo y lo parseo
                const contenido = await this.GetAll();
                // Retorno el elementro filtrado por ID
                return contenido.filter((el) => el.id === id);
            } catch (error) {
                console.log("😢 No se pudo leer el id: " + error);
            }
        } else {
            return null;
        }
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async GetAll() {
        try {
            // Leo el archivo y lo almaceno en una variable
            const contenidoArchivo = await fs.promises.readFile(
                `./${this.nombreArchivo}`,
                "utf-8"
            );
            // Retorno el contenido del archivo
            return JSON.parse(contenidoArchivo);
        } catch (error) {
            return [];
        }
    }

    Update(id, data) {
        const productoID = this.productos.find((e) => e.id === Number(id));
        Object.assign(productoID, data);
        return productoID;
    }

    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async DeleteById(id) {
        if (id) {
            try {
                const contenido = await this.GetAll();

                // Busco el indice del elemento por ID
                const indexID = contenido.findIndex((item) => item.id === id);

                // Lo quito del Array
                contenido.splice(indexID, 1);

                // Reescribo el archivo
                await fs.promises.writeFile(
                    `./${this.nombreArchivo}`,
                    JSON.stringify(contenido, null, 2)
                );
                return "Se elimino el elemento con el id " + id;
            } catch (error) {
                console.log("😢 No se pudo leer el id: " + error);
            }
        } else {
            return null;
        }
    }

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async DeleteAll() {
        try {
            await fs.promises.writeFile(`./${this.nombreArchivo}`, "[]");
            return "Todos los elementos borrados";
        } catch (error) {
            console.log(
                `\n😢 No se pudo borrar el contenido de: "./${this.nombreArchivo}":\n ${error} \n\n`
            );
        }
    }
}

module.exports = Productos;
