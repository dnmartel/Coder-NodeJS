/* eslint-disable no-unused-vars */
async function renderCarrito() {
    await fetch("/api/carrito/63ab4fa7a6c3fce7ace0ec31/productos")
        .then((res) => res.json())
        .then((res) =>
            res.forEach((g, index) => {
                return (document.getElementById(
                    "productosCarrito"
                ).innerHTML += `
            <article class="cards${index+1}">
            <h4>${g.nombre}</h4>
            <p>Descripcion: ${g.descripcion}</p>
            <p>Precio: ${g.precio}</p>
            <p>Stock: ${g.stock}</p>
            <button onclick="eliminarProductoCarrito('${
                g.id || g._id
            }')">Eliminar</button>
            </article>`);
            })
        );
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

renderCarrito();
