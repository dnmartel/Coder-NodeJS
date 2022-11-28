export default {
    fileSystem: {
        path: "./db"
    },
    mongoDB: {
        URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.capdcjp.mongodb.net/ecommerce?retryWrites=true&w=majority`,
        URIsession: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.capdcjp.mongodb.net/sesiones?retryWrites=true&w=majority`
    },
    firebase: {
        URI: "../db/ecommerce-node-634c3-firebase-adminsdk-1qrk7-364219ea78.json"
    },
    sqlite3: {
        client: "sqlite3",
        connection: {
            filename: "./db/ecommerce.sqlite"
        },
        useNullAsDefault: true
    }
};
