import fs from "fs";

export default class Mensajes {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    // save(Object) - Recibe un objeto, lo guarda en el archivo
    async save(obj) {
        try {
            // Traigo el contenido del archivo y lo parseo
            const contenido = await this.getAll();
            // Pusheo el objeto al array
            contenido.push(obj);
            // Escribo el objeto
            await fs.promises.writeFile(
                `./${this.nombreArchivo}`,
                JSON.stringify(contenido, null, 2)
            );
            return obj;
        } catch (error) {
            console.log("😢 No se pudo guardar el objeto: " + error);
        }
    }

    // getAll(): Object[] - Devuelve un array con los  presentes en el archivo.
    async getAll() {
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
}
