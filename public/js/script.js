/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */

async function fetchHTML(inputFetch, data) {
    fetch(inputFetch)
        .then((res) => {
            return res.text();
        })
        .then((text) => {
            const template = Handlebars.compile(text);
            const html = template({ data });
            document.querySelector("tbody").innerHTML = html;
        })
        .catch((err) => console.log(err));
}
// Variables para mensajes
let mensajes = [];
const formMessage = document.getElementById("form-message");
const inputEmail = document.getElementById("input-email");
const inputMessage = document.getElementById("input-message");
const showMessage = document.getElementById("show-message");

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
    mensajes = data;
    updateMessages(mensajes);
});

socket.on("notificacion", (data) => {
    mensajes.push(data);
    updateMessages(mensajes);
});

function updateMessages(messages = []) {
    showMessage.innerText = "";
    messages.forEach((data) => {
        const item = document.createElement("li");
        item.innerHTML = `<span class="userChat">${data.email} </span><span class="dateChat">[${data.timestamp}]</span> -> <span class="msgChat">${data.message} </span>`;
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
    console.log("productos", productos);
    fetchHTML("../views/template.handlebars", productos);
});
