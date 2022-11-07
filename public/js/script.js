/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */

async function fetchHTML(inputFetch, id, data) {
    fetch(inputFetch)
        .then((res) => {
            return res.text();
        })
        .then((text) => {
            const template = Handlebars.compile(text);
            const html = template({ data });
            document.getElementById(id).innerHTML = html;
        })
        .catch((err) => console.log(err));
}

// Variables para mensajes
let mensajes = [];
const formMessage = document.getElementById("form-message");
const inputEmail = document.getElementById("input-email");
const inputMessage = document.getElementById("input-message");
const showMessage = document.getElementById("show-message");
const inputName = document.getElementById("input-name");
const inputLastName = document.getElementById("input-lastname");
const inputAge = document.getElementById("input-age");
const inputAvatar = document.getElementById("input-avatar");
const inputAlias = document.getElementById("input-alias");

// Variables para productos
const submitProductos = document.getElementById("submit-products");
const titleProductos = document.getElementById("title-product");
const priceProductos = document.getElementById("price-product");
const thumbProductos = document.getElementById("thumbnail-product");

const socket = io();

// SOCKET
socket.on("connect", () => {
    console.log("🎉 Conectados al servidor");
});

// MENSAJES
socket.on("inicio", (data) => {
    const userScheme = new normalizr.schema.Entity("users");

    const authorScheme = new normalizr.schema.Entity(
        "author",
        { author: userScheme },
        { idAttribute: "email" }
    );

    const textScheme = new normalizr.schema.Entity("text", {});
    const timestampScheme = new normalizr.schema.Entity("timestamp", {});

    const messagesScheme = new normalizr.schema.Entity("messagesArr", {
        author: authorScheme
    });

    const mensajesFinal = new normalizr.schema.Entity("mensajesFinal", {
        text: textScheme,
        timestamp: timestampScheme,
        messagesArr: [messagesScheme]
    });

    const reverse = normalizr.denormalize(
        data.result,
        mensajesFinal,
        data.entities
    );
    mensajes = reverse.messagesArr;

    updateMessages(mensajes);
});

socket.on("notificacion", (data) => {
    mensajes.push(data);
    updateMessages(mensajes);
});

socket.on("compresion", (mensajesOriginal, mensajesNormalized) => {
    document.getElementById("compresion").innerHTML = `Tasa de compresión: %
    ${ ((JSON.stringify(mensajesNormalized).length * 100) /
    JSON.stringify(mensajesOriginal).length).toFixed(2) } `;
});

function updateMessages(messages) {
    showMessage.innerText = "";
    messages.forEach((data) => {
        const item = document.createElement("li");
        item.innerHTML = `<span class="userChat">${data.author.email} </span><span class="dateChat">[${data.timestamp}]</span> -> <span class="msgChat">${data.text} </span><img src="${data.author.avatar}" class="avatar">`;
        showMessage.appendChild(item);
    });
}

function isEmail(emailAdress) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.match(regex)) return true;
    else return false;
}

formMessage.addEventListener("submit", (event) => {
    event.preventDefault();
    if (isEmail(inputEmail.value)) {
        document.getElementById("validEmail").innerHTML = "";
        const ts = dayjs().format("DD/MM/YYYY HH:mm:ss");
        const data = {
            email: inputEmail.value,
            name: inputName.value,
            lastname: inputLastName.value,
            age: inputAge.value,
            avatar: inputAvatar.value,
            alias: inputAlias.value,
            message: inputMessage.value,
            timestamp: ts
        };
        socket.emit("nuevo-mensaje", data);
        inputMessage.value = "";
        inputMessage.focus();
    } else {
        document.getElementById("validEmail").innerHTML =
            "El correo no es válido.";
    }
});

// PRODUCTOS
submitProductos.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("submit-products", {
        nombre: titleProductos.value,
        precio: priceProductos.value,
        foto: thumbProductos.value
    });
});

socket.on("refresh-products", (productos) => {
    fetchHTML("../views/template.handlebars", "tbody-productos", productos);
});
