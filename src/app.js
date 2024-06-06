 const fastifyPlugin = require('fastify-plugin')

 /**
  * 
  * @param {Fastify object} fastiy 
  * @param {*} options 
  */
 async function app(fastify, options) {
    fastify.register(require('@fastify/cors'));
      // register services
      fastify.register(require('./services/servicePlugin'))
    // register test router
    fastify.register(require('./routes/api/apiRouter'), {prefix: '/api'})
 }

 module.exports = fastifyPlugin(app);