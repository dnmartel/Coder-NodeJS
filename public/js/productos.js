/* eslint-disable no-unused-vars */

async function renderProducts() {
    let data;
    await fetch("/api/productos/")
        .then((res) => res.json())
        .then((res) => {
            data = res;
        });

    data.forEach((e) => {
        const article = document.createElement("article");
        article.innerHTML = `
                            <header>
                            <img src="${e.foto}" alt="${
            e.nombre
        }" width="50px" height="50px"> 
                            ${e.nombre}
                            </header>
                            <p>Descripcion: ${e.descripcion}</p>
                            <p>ID: ${e.id || e._id}</p>
                            <p>Precio: ${e.precio}</p>
                            <p>Stock: ${e.stock}</p>
                            <footer id="btn${e.id || e._id}">
                            <button onclick="agregarProductoCarrito('${
                                e.id || e._id
                            }')">Agregar a Carrito</button>
                            </footer>
                            `;

        article.classList.add("card");
        article.id = `ID-${e.id || e._id}`;
        document.getElementById("productos").append(article);
    });
}

async function agregarProductoCarrito(id) {
    let productoAgregar;
    await fetch(`./api/productos/${id}`)
        .then((res) => res.json())
        .then((res) => {
            productoAgregar = res;
        });

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoAgregar)
    };

    await fetch(`/api/carrito/63ab4fa7a6c3fce7ace0ec31/productos`, options)
        .then(() => {
            alert("Producto agregado");
        });

    window.location.reload();
}

renderProducts();
