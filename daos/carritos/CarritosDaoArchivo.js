import ContenedorArchivo from "../../controller/ContenedorArchivo.js";

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("carrito.json");
    }
}

export default CarritosDaoArchivo;
