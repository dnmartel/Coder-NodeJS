import mensajesModel from "../../models/mensajesModel.js";
import ContenedorMongoDB from "../../controllers/ContenedorMongoDB.js";

class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(mensajesModel);
    }
}

export default MensajesDaoMongoDB;
