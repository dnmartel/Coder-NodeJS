import carritoModel from "../../models/carritoModel.js";
import ContenedorMongoDB from "../../controllers/ContenedorMongoDB.js";

class CarritoDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(carritoModel);
    }
}

export default CarritoDaoMongoDB;
