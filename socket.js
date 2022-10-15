import dayjs from "dayjs";
import Mensajes from "./controllers/mensajes.js";
import { Server } from "socket.io";
// Inicializo un array de productos en memoria, basado en clase
import Productos from "./controllers/productos.js";

const mensajes = new Mensajes("./db/mensajes.txt");
const productos = new Productos();
let io;

export default function initSocket(httpServer) {
    io = new Server(httpServer);
    setEvent(io);
}

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

mensajes.save({
    email: "hola@email.com",
    mensaje: "First message",
    ts: dayjs().format("DD/MM/YYYY HH:mm:ss")
});

function setEvent(io) {
    io.on("connection", (clienteSocket) => {
        console.log("😁 Nuevo cliente conectado", clienteSocket.id);
        io.emit("refresh-products", productos.GetAll());

        async function updateMessages() {
            await mensajes.getAll().then((data) => {
                clienteSocket.emit("inicio", data);
            });
        }
        updateMessages();

        // MENSAJES NUEVOS
        clienteSocket.on("nuevo-mensaje", (data) => {
            mensajes.save({
                email: data.email,
                mensaje: data.mensaje,
                ts: data.ts
            });
            io.emit("notificacion", {
                email: data.email,
                mensaje: data.mensaje,
                ts: dayjs().format("DD/MM/YYYY HH:mm:ss")
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
