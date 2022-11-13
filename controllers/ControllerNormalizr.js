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

/*     console.log("DATA ORIGINAL");
    console.log(
        "--------------------------------------------------------------"
    );
    console.log(JSON.stringify(base).length);

    console.log("DATA NORMALIZADA");
    console.log(
        "--------------------------------------------------------------"
    );
    console.log(JSON.stringify(result).length);

    const reverse = denormalize(result.result, mensajesFinal, result.entities);
    console.log("DATA DESNORMALIZADA");
    console.log(
        "--------------------------------------------------------------"
    );
    console.log(JSON.stringify(reverse).length); */

    return result;
};

export default ControllerNormalizer;
