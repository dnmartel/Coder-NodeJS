import dayjs from "dayjs";
import Mensajes from "./controllers/mensajes.js";
import { Server } from "socket.io";
// Inicializo un array de productos en memoria, basado en clase
import Productos from "./controllers/productos.js";
import {
    optionsMySQL,
    createTableMySQL,
    optionsSQLite3,
    createTableSQLite3
} from "./db/index.js";

const tableMySQL = "pruebas_productos";
const tableSQLite3 = "tabla_mensajes";

createTableMySQL(tableMySQL);
createTableSQLite3(tableSQLite3);
const mensajes = new Mensajes(optionsSQLite3, tableSQLite3);
const productos = new Productos(optionsMySQL, tableMySQL);

let io;

export default function initSocket(httpServer) {
    io = new Server(httpServer);
    setEvent(io);
}

function setEvent(io) {
    io.on("connection", async (clienteSocket) => {
        console.log("😁 Nuevo cliente conectado", clienteSocket.id);
        io.emit("refresh-products", await productos.GetAll());

        async function updateMessages() {
            await mensajes.GetAll().then((data) => {
                clienteSocket.emit("inicio", data);
            });
        }
        updateMessages();

        // MENSAJES NUEVOS
        clienteSocket.on("nuevo-mensaje", async (data) => {
            await mensajes.Save({
                email: data.email,
                message: data.message,
                timestamp: data.timestamp
            });
            io.emit("notificacion", {
                email: data.email,
                message: data.message,
                timestamp: dayjs().format("DD/MM/YYYY HH:mm:ss")
            });
        });

        // PRODUCTOS NUEVOS
        clienteSocket.on("submit-products", async (data) => {
            console.log("🎈 Productos recibidos del formulario");
            await productos.Save(data);
            io.emit("refresh-products", await productos.GetAll());
        });

        clienteSocket.on("disconnect", () => {
            console.log("Cliente desconectado", clienteSocket.id);
        });
    });
}
