import ContenedorFirebase from "../../controller/ContenedorFirebase.js";

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("productos"); 
    }
}

export default ProductosDaoFirebase;
