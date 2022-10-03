/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
(function () {
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
    const tablaProductos = document.getElementById("tabla-productos");

    const socket = io();

    // SOCKET
    socket.on("connect", () => {
        console.log("🎉 Conectados al servidor");
    });

    socket.on("inicio", (data) => {
        mensajes = data;
        updateMessages(mensajes);
    });

    socket.on("notificacion", (data) => {
        mensajes.push(data);
        updateMessages(mensajes);
    });

    // MENSAJES
    function updateMessages(messages = []) {
        showMessage.innerText = "";
        messages.forEach((data) => {
            const item = document.createElement("li");
            item.innerText = `Usuario ${data.email} -> ${data.mensaje}`;
            showMessage.appendChild(item);
        });
    }

    formMessage.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = { email: inputEmail.value, mensaje: inputMessage.value };
        socket.emit("nuevo-mensaje", data);
        inputMessage.value = "";
        inputMessage.focus();
    });

    // PRODUCTOS
    submitProductos.addEventListener("click", (e) => {
        e.preventDefault();
        socket.emit("submit-products", {
            title: titleProductos.value,
            price: priceProductos.value,
            thumbnail: thumbProductos.value
        });
    });

    socket.on("refresh-products", (productos) => {
        tablaProductos.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
            </thead>
            <tbody id="tbody-productos">
            </tbody>`;
        productos.forEach((data) => {
            console.log(data.title);
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${data.title}</td><td>${data.price}</td><td><img src="${data.thumbnail}" alt="${data.title}}" width="50px" height="50px"></td>`;
            console.log(tr);
            document.getElementById("tbody-productos").appendChild(tr);
        });
    });
})();
