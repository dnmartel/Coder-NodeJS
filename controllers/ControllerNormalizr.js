import { schema, normalize, denormalize } from "normalizr";
const ControllerNormalizer = async (data) => {
    let base = {
        id: "messagesID",
        messagesArr: []
    };

    data.map((item) => {
        base.messagesArr.push({
            id: item._id.toString(),
            text: item.text,
            timestamp: item.timestamp,
            author: {
                email: item.author.email,
                nombre: item.author.nombre,
                apellido: item.author.apellido,
                edad: item.author.edad,
                alias: item.author.alias,
                avatar: item.author.avatar
            }
        });
    });

    const authorScheme = new schema.Entity(
        "author",
        {},
        { idAttribute: "email" }
    );

    const messagesScheme = new schema.Entity("messagesArr", {
        author: authorScheme
    });

    const mensajesFinal = new schema.Entity("mensajesFinal", {
        messagesArr: [messagesScheme]
    });

    const result = normalize(base, mensajesFinal);

    return result;
};

export default ControllerNormalizer;
