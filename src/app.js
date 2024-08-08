const fastifyPlugin = require('fastify-plugin')
const fastifyCors = require('@fastify/cors');
const apiRoutes = require('./routes/apiRoutes');
const servicePlugin = require('./services/servicePlugin');
const repositoryPlugin = require('./repositories/repositoryPlugin')
 /**
  *
  * @param fastify
  * @param {*} options
  */
 async function app(fastify, options) {
    fastify.register(fastifyCors);
    fastify.register(servicePlugin);
    fastify.register(repositoryPlugin);
    // register test router
    fastify.register(apiRoutes, {prefix: '/api'})
 }

 module.exports = fastifyPlugin(app);