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

// PRODUCTOS

socket.on("refresh-products", (productos) => {
    fetchHTML("../views/template.handlebars", "tbody-productos", productos);
});
