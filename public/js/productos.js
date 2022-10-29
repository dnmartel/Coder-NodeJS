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
                            <img src="${e.foto}" alt="${e.nombre}" width="50px" height="50px"> 
                            ${e.nombre}
                            </header>
                            <p>Descripcion: ${e.descripcion}</p>
                            <p>ID: ${e.id || e._id}</p>
                            <p>Precio: ${e.precio}</p>
                            <p>Stock: ${e.stock}</p>
                            <footer id="btn${e.id || e._id}">
                            <button onclick="modificarProducto('${e.id || e._id}')">Modificar</button>
                            <button onclick="eliminarProducto('${e.id || e._id}')">Eliminar</button>
                            </footer>
                            `;

        article.classList.add("card");
        article.id = `ID-${e.id || e._id}`;
        document.getElementById("productos").append(article);
    });
}

async function modificarProducto(id) {
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion: "Memoria RAM Kingston 8GB" })
    };

    await fetch(`/api/productos/${id}`, options)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
        });
    alert("Descripción modificada");
    window.location.reload();
}

async function eliminarProducto(id) {
    const e = document.querySelector(`#ID-${id}`);
    await fetch(`/api/productos/${id}`, { method: "DELETE" }).then(
        () => (e.innerHTML = "Elemento eliminado")
    );
}

async function submitForm(e) {
    const bodyContent = {};
    bodyContent.nombre = document.getElementById("nombre").value;
    bodyContent.descripcion = document.getElementById("descripcion").value;
    bodyContent.codigo = document.getElementById("codigo").value;
    bodyContent.foto = document.getElementById("foto").value;
    bodyContent.precio = document.getElementById("precio").value;
    bodyContent.stock = document.getElementById("stock").value;
    e.preventDefault();

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyContent)
    };

    await fetch("/api/productos/", options)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
        });
    window.location.reload();
}

renderProducts();
