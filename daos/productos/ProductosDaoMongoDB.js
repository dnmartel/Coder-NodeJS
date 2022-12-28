import productosModel from "../../models/productosModel.js";
import ContenedorMongoDB from "../../controllers/ContenedorMongoDB.js";

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(productosModel);
    }
}

export default ProductosDaoMongoDB;
