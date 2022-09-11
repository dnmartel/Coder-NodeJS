const fs = require('fs');

class Contenedor {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(obj) {
        try {
            //Traigo el contenido del archivo y lo parseo
            let contenido = await this.getAll();/* 
            let contenido = JSON.parse(contenidoArchivo); */
            //Asigno ID 1 si no tiene contenido, sino, 1 más que el último
            if (contenido.length === 0) {
                obj.id = 1;
            } else {
                obj.id = (contenido[contenido.length - 1].id) + 1;
            };
            //Pusheo el objeto al array
            contenido.push(obj);
            //Escribo el objeto
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(contenido, null, 2))

            return (' Objeto guardado correctamente 😁', `\n Ruta del archivo: ./${this.nombreArchivo}\n`, obj);
        } catch (error) {
            console.log("😢 No se pudo guardar el objeto: " + error)
        }
    }

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        if (id) {
            try {
                //Traigo el contenido del archivo y lo parseo
                let contenido = await this.getAll()/* 
                let contenido = JSON.parse(contenidoArchivo) */

                //Retorno el elementro filtrado por ID
                return contenido.filter(el => el.id === id)
            } catch (error) {
                console.log('😢 No se pudo leer el id: ' + error)
            }
        } else {
            return null
        }

    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            //Leo el archivo y lo almaceno en una variable
            const contenidoArchivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            //Retorno el contenido del archivo
            return (JSON.parse(contenidoArchivo));
        } catch (error) {
            return []
        }
    }

    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(id) {

        if (id) {
            try {
                let contenido = await this.getAll()/* 
                let contenido = JSON.parse(contenidoArchivo) */

                //Busco el indice del elemento por ID
                let indexID = contenido.findIndex(item => item.id === id);
                //Lo quito del Array
                contenido.splice(indexID, 1);
                //Reescribo el archivo
                await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(contenido, null, 2))
                return ('Se elimino el elemento con el id ' + id)
            } catch (error) {
                console.log('😢 No se pudo leer el id: ' + error)
            }
        } else {
            return null
        }

    }

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.nombreArchivo}`, "[]")
            return ('Todos los elementos borrados');
        } catch (error) {
            console.log(`\n😢 No se pudo borrar el contenido de: "./${this.nombreArchivo}":\n ${error} \n\n`)
        }
    }

}

async function checkFile(nombreArchivo) {
    let existe = true;

    try {
        existe = await fs.promises.readFile(`./${nombreArchivo}`, 'utf-8');
    } catch (error) {
        existe = false;
    }

    if (!existe) {
        await fs.promises.writeFile(`./${nombreArchivo}`, "[]")
    }
}
checkFile("productos.txt");

let archivoTest = new Contenedor("productos.txt");

async function metodosTest() {
    await archivoTest.save({
        title: 'Regla',
        price: 223.25,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'

    })
    await archivoTest.save({
        title: 'Perro',
        price: 300.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'

    })
    await archivoTest.save({
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    });

    await archivoTest.save({
        title: 'Escuadra',
        price: 123.49,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    });

    await archivoTest.save({
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    });


    /* console.log(await archivoTest.getById(3))
    console.log('.........................................................');
    console.log(await archivoTest.getAll())
    console.log('.........................................................');
    console.log(await archivoTest.deleteById(2));
    console.log('.........................................................');
    console.log(await archivoTest.getAll());
    console.log('.........................................................');
    console.log(await archivoTest.deleteAll()); */
}
metodosTest()