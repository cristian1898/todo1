const exitsController = require('./controller');
module.exports = fastify => {
    fastify.post("/exit/:id", exitsController.create);
    fastify.get("/exits/:id", exitsController.list);
    fastify.get("/exits/:id/:id_exit", exitsController.read);
    //fastify.get("/entries/search", entriesController.search);

};
