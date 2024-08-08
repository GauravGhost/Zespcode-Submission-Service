const fastifyPlugin = require('fastify-plugin')
const fastifyCors = require('@fastify/cors');
const apiRoutes = require('./routes/apiRoutes');
 /**
  *
  * @param fastify
  * @param {*} options
  */
 async function app(fastify, options) {
    fastify.register(fastifyCors);

    // register test router
    fastify.register(apiRoutes, {prefix: '/api'})
 }

 module.exports = fastifyPlugin(app);