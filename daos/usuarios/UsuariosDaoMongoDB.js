import ContenedorMongoDB from "../../controllers/ContenedorMongoDB.js";
import usersModel from "../../models/usuariosModel.js";

class UsuariosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(usersModel);
    }
}

export default UsuariosDaoMongoDB;
