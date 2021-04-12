const pino = require('pino')
const fastify = require('fastify')({
  logger: pino({
    prettyPrint: true
  })
})
const cors = require('fastify-cors');
const formBody = require('fastify-formbody');
const helmet = require('fastify-helmet');
const routes = require('fastify-routes');
const statics = require('fastify-static');
const path = require('path');
const pointOfView = require('point-of-view');
const mustache = require('mustache');
const config = require('./src/config/config');
const mongo = require('./src/integrations/mongodb.connection');

//integrations connects
mongo.connect();




//Registers
fastify.register(helmet);
fastify.register(cors);
fastify.register(routes);
fastify.register(formBody);
fastify.register(require('fastify-multipart'))
// Routes

require('./src/cardex/entries/route')(fastify);
require('./src/cardex/exits/route')(fastify);
require('./src/cardex/product/route')(fastify);


//Register statics-route files
fastify.register(statics, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})



const start = async () => {
  try {
    await fastify.listen(config.PORT, '0.0.0.0');
    fastify.log.info(`server listening on ${config.PORT}`)

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start();
// Run the server!
module.exports = start;







