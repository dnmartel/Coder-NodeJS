/* eslint-disable no-unused-vars */
let idCarrito;
async function renderCarrito() {
    let data;
    await fetch("/api/carritos")
        .then((res) => res.json())
        .then((res) => {
            data = res;
        });

    data.forEach((e) => {
        const article = document.createElement("article");
        article.innerHTML = `
        
        <button id="carrito-${e.id || e._id}">
            <li>        
            CARRITO ID ${e.id || e._id}
            </li>
        </button>`;
        document.getElementById("carritos").append(article);
        addEventCarrito(e);
    });
}
function addEventCarrito(e) {
    document
        .getElementById(`carrito-${e.id || e._id}`)
        .addEventListener("click", async () => {
            await fetch(`/api/carrito/${e.id || e._id}/productos`)
                .then((res) => {
                    document.getElementById("carritos").innerHTML = `
                        <header>
                            Identificador de carrito: ${e.id || e._id}
                        </header>
                        Productos:`;
                        console.log(`${e.id || e._id}`);
                    idCarrito = e.id || e._id;
                    return res.json();
                })
                .then((data) => {
                    return renderProductosCarrito(data);
                })
                .catch((err) => console.log(err));
        });
}
function renderProductosCarrito(res) {
    
    res.forEach((g) => {
        return (document.getElementById("productosCarrito").innerHTML += `
            <article>
            <h4>${g.nombre}</h4>
            <p>Descripcion: ${g.descripcion}</p>
            <p>ID: ${g.id || g._id}</p>
            <p>Precio: ${g.precio}</p>
            <p>Stock: ${g.stock}</p>
            </article>`);
    });
    productosAComprar();
}

async function productosAComprar() {
    await fetch("/api/productos/")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            data.forEach((e) => {
                document.getElementById(
                    "agregarProductos"
                ).innerHTML += `<button style="width: 50%" id="agregarACarrito${e.id || e._id}">Agregar Producto - ${e.id || e._id}</button>`;
            });
            data.forEach((e) => {
                document
                    .getElementById(`agregarACarrito${e.id || e._id}`)
                    .addEventListener("click", async () => {
                        const body = {
                            nombre: `${e.nombre}`,
                            descripcion: `${e.descripcion}`,
                            codigo: `${e.codigo}`,
                            foto: `${e.foto}`,
                            precio: `${e.precio}`,
                            stock: `${e.stock}`,
                            timestamp: `${e.timestamp}`,
                            id: `${e.id || e._id}`
                        };
                        await fetch(`/api/carrito/${idCarrito}/productos`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        })
                            .then(() => {
                                alert("Producto agregado");
                                window.location.reload();
                            })
                            .catch(console.log());
                    });
            });
        });
}

renderCarrito();
