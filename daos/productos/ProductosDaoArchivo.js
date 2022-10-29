import ContenedorArchivo from "../../controller/ContenedorArchivo.js";

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("productos.json");
    }
}

export default ProductosDaoArchivo;
