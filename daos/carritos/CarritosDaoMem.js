import ContenedorMemoria from "../../controller/ContenedorMemoria.js";

class CarritosDaoMem extends ContenedorMemoria {
    constructor() {
        super();
        this.elementos = [
            {
                id: "1",
                timestamp: "",
                productos: [
                    {
                        id: "100",
                        timestamp: "",
                        nombre: "Producto 1",
                        descripcion: "Descripcion de producto",
                        codigo: "",
                        foto: "",
                        precio: 1,
                        stock: 1
                    },
                    {
                        id: "101",
                        timestamp: "",
                        nombre: "Producto 2",
                        descripcion: "Descripcion de producto",
                        codigo: "",
                        foto: "",
                        precio: 20,
                        stock: 12
                    },
                    {
                        id: "103",
                        timestamp: "",
                        nombre: "Producto 3",
                        descripcion: "Descripcion de producto",
                        codigo: "",
                        foto: "",
                        precio: 30,
                        stock: 31
                    }
                ]
            },
            {
                id: "2",
                timestamp: "08/10/2022 00:49:48",
                productos: [
                    {
                        id: "100",
                        timestamp: "",
                        nombre: "",
                        descripcion: "",
                        codigo: "",
                        foto: "",
                        precio: 1,
                        stock: 1
                    },
                    {
                        id: "101",
                        timestamp: "",
                        nombre: "",
                        descripcion: "",
                        codigo: "",
                        foto: "",
                        precio: 20,
                        stock: 12
                    },
                    {
                        id: "103",
                        timestamp: "",
                        nombre: "",
                        descripcion: "",
                        codigo: "",
                        foto: "",
                        precio: 30,
                        stock: 31
                    },
                    {
                        nombre: "asdasd",
                        descripcion: "asdsaddsa",
                        codigo: "132132",
                        foto: "",
                        precio: 21,
                        stock: 21,
                        id: "e6a5161d-ebc1-4e6a-98a6-10246f9d3566",
                        timestamp: "08/10/2022 01:08:18"
                    },
                    {
                        nombre: "asdasd123",
                        descripcion: "asdsadds123a",
                        codigo: "132333132",
                        foto: "",
                        precio: 21,
                        stock: 21,
                        id: "251b8592-6672-4438-b100-3fc8b2a8c45f",
                        timestamp: "08/10/2022 01:08:59"
                    },
                    {
                        nombre: "asd",
                        descripcion: "Memoria RAM Kingston 8GB",
                        codigo: "asd",
                        foto: "https://http2.mlstatic.com/D_NQ_NP_987686-MLA41789384108_052020-O.webp",
                        precio: "123",
                        stock: "123",
                        id: "60bc593f-4344-44fd-9016-a376459f5bf6",
                        timestamp: "10/10/2022 15:39:51"
                    },
                    {
                        nombre: "Memoria 3",
                        descripcion: "Memoria RAM Kingston 12345GB",
                        codigo: "123",
                        foto: "https://www.qloud.ar/SITES/ryr/fotos/20732-0.jpg",
                        precio: "50",
                        stock: "10",
                        timestamp: "10/10/2022 15:49:02",
                        id: "05207da8-a77c-4a6d-b620-d3ee28fbc409"
                    }
                ]
            },
            {
                id: "3",
                timestamp: "",
                productos: [
                    {
                        id: "100",
                        timestamp: "",
                        nombre: "",
                        descripcion: "",
                        codigo: "",
                        foto: "",
                        precio: 1,
                        stock: 1
                    },
                    {
                        nombre: "asd",
                        descripcion: "Memoria RAM Kingston 8GB",
                        codigo: "asd",
                        foto: "https://http2.mlstatic.com/D_NQ_NP_987686-MLA41789384108_052020-O.webp",
                        precio: "123",
                        stock: "123",
                        timestamp: "10/10/2022 15:44:39",
                        id: "ef127baa-721a-4236-855f-24925363d34b"
                    },
                    {
                        nombre: "Memoria 4",
                        descripcion: "Memoria RAM Kingston 8GB",
                        codigo: "123",
                        foto: "https://www.qloud.ar/SITES/ryr/fotos/20732-0.jpg",
                        precio: "50",
                        stock: "10",
                        timestamp: "10/10/2022 16:01:45",
                        id: "21da1e09-d8a4-49da-9d53-7ede21f00104"
                    }
                ]
            }
        ];
    }
}

export default CarritosDaoMem;
