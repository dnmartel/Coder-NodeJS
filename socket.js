import dayjs from "dayjs";
import { Server } from "socket.io";
import { mensajesDao, productosDao } from "./daos/index.js";
import ControllerNormalizer from "./controllers/ControllerNormalizr.js";
let io;
let mensajesOriginal;
let mensajesNormalized;

export default function initSocket(httpServer) {
    io = new Server(httpServer);
    setEvent(io);
}

function setEvent(io) {
    io.on("connection", async (clienteSocket) => {
        console.log("😁 Nuevo cliente conectado", clienteSocket.id);

        io.emit("refresh-products", await productosDao.GetAll());

        mensajesOriginal = await mensajesDao.GetAll();
        mensajesNormalized = await ControllerNormalizer(mensajesOriginal);
        clienteSocket.emit("inicio", mensajesNormalized);
        io.emit("compresion", mensajesOriginal, mensajesNormalized)

        // MENSAJES NUEVOS
        clienteSocket.on("nuevo-mensaje", async (data) => {
            await mensajesDao.Save({
                author: {
                    email: data.email,
                    nombre: data.name,
                    apellido: data.lastname,
                    edad: data.age,
                    alias: data.alias,
                    avatar: data.avatar
                },
                text: data.message,
                timestamp: data.timestamp
            });
            io.emit("notificacion", {
                author: {
                    email: data.email,
                    nombre: data.name,
                    apellido: data.lastname,
                    edad: data.age,
                    alias: data.alias,
                    avatar: data.avatar
                },
                text: data.message,
                timestamp: dayjs().format("DD/MM/YYYY HH:mm:ss")
            });
            io.emit("compresion", mensajesOriginal, mensajesNormalized)
        });

        // PRODUCTOS NUEVOS
        clienteSocket.on("submit-products", async (data) => {
            console.log("🎈 Productos recibidos del formulario");
            await productosDao.Save(data);
            io.emit("refresh-products", await productosDao.GetAll());
        });

        clienteSocket.on("disconnect", () => {
            console.log("Cliente desconectado", clienteSocket.id);
        });
    });
}
