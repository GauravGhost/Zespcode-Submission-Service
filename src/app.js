 const fastifyPlugin = require('fastify-plugin')

 /**
  * 
  * @param {Fastify object} fastiy 
  * @param {*} options 
  */
 async function app(fastify, options) {
    fastify.register(require('@fastify/cors'));

    // register test router
    fastify.register(require('./routes/testRoutes'), {prefix: '/test'})
 }

 module.exports = fastifyPlugin(app);