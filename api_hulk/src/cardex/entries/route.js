const entriesController = require('./controller');
module.exports = fastify => {
    fastify.post("/entrie/:id", entriesController.create);
    fastify.get("/entries/:id", entriesController.list);
    fastify.get("/entries/:id/:id_entrie", entriesController.read);
    //fastify.get("/entries/search", entriesController.search);

};
