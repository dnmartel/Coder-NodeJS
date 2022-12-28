import ContenedorMongoDB from "../../controllers/ContenedorMongoDB.js";
import usersModel from "../../models/usuariosModel.js";

class UsuariosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(usersModel);
    }

    async GetByEmail(email) {
        return await this.collection.find({ email: `${email}` });
    }
}

export default UsuariosDaoMongoDB;
