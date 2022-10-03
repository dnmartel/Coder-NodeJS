const { Server } = require("socket.io");
let io;

function initSocket(httpServer) {
    io = new Server(httpServer);
    setEvent(io);
}

// Inicializo un array de productos en memoria, basado en clase
const Productos = require("./modules/productos");
const productos = new Productos();
productos.Save({
    title: "Escuadra",
    price: 123.49,
    thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
});
productos.Save({
    title: "Regla",
    price: 485.36,
    thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
});

const mensajes = [
    {
        email: "hola@email.com",
        mensaje: "First message"
    }
];

function setEvent(io) {
    io.on("connection", (clienteSocket) => {
        console.log("😁 Nuevo cliente conectado", clienteSocket.id);
        io.emit("refresh-products", productos.GetAll());
        clienteSocket.emit("inicio", mensajes);

        // MENSAJES NUEVOS
        clienteSocket.on("nuevo-mensaje", (data) => {
            mensajes.push({ email: data.email, mensaje: data.mensaje });
            io.emit("notificacion", {
                email: data.email,
                mensaje: data.mensaje
            });
        });

        // PRODUCTOS NUEVOS
        clienteSocket.on("submit-products", (data) => {
            console.log("🎈 Productos recibidos del formulario");
            productos.Save(data);
            io.emit("refresh-products", productos.GetAll());
        });

        clienteSocket.on("disconnect", () => {
            console.log("Cliente desconectado", clienteSocket.id);
        });
    });
}

module.exports = { initSocket };
