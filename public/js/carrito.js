/* eslint-disable no-unused-vars */

let productosCarrito;
async function renderCarrito() {
    await fetch("/api/carrito/63ab4fa7a6c3fce7ace0ec31/productos")
        .then((res) => res.json())
        .then((res) => {
            productosCarrito = res;

            res.forEach((g, index) => {
                return (document.getElementById(
                    "productosCarrito"
                ).innerHTML += `
            <article class="cards${index + 1}">
            <h4>${g.nombre}</h4>
            <p>Descripcion: ${g.descripcion}</p>
            <p>Precio: ${g.precio}</p>
            <p>Stock: ${g.stock}</p>
            <button onclick="eliminarProductoCarrito('${
                g.id || g._id
            }')">Eliminar</button>
            </article>`);
            });
        });
}

async function eliminarProductoCarrito(id) {
    const options = {
        method: "DELETE"
    };

    await fetch(
        `./api/carrito/63ab4fa7a6c3fce7ace0ec31/productos/${id}`,
        options
    ).then(() => {
        alert("Producto eliminado");
    });

    window.location.reload();
}

async function iniciarPedido(nombre, email, phone) {
    let body = {
        name: nombre,
        email,
        phone,
        mensaje: `<p>Nuevo pedido, detalle:</p>`
    };
    productosCarrito.forEach((e) => {
        body.mensaje += `\n<p>${e.nombre}</p>\n<p>${e.descripcion}</p>\n`;
    });

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    };
    await fetch("./notificar", options).then(() => {
        console.log("Pedido realizado");
    });
}

renderCarrito();
