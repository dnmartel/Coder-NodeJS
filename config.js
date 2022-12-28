export default {
    mongoDB: {
        URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.capdcjp.mongodb.net/ecommerce?retryWrites=true&w=majority`,
        URIsession: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.capdcjp.mongodb.net/sesiones?retryWrites=true&w=majority`
    }
};
