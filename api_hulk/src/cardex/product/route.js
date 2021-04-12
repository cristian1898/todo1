const productController = require('./controller');

module.exports = fastify => {

    fastify.post("/product", productController.create);
    fastify.get("/products", productController.list);
    fastify.get("/product/:id", productController.read);
    fastify.put("/product/:id", productController.update);
    fastify.delete("/product/:id", productController.delete);
    fastify.post("/product/:id/upload", productController.uploadPictureByIdProduct);
    // fastify.get("/product/search", productController.search);


};
