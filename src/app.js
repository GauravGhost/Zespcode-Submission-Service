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
   await fastify.register(fastifyCors);
   await fastify.register(repositoryPlugin);
   await fastify.register(servicePlugin);
   // register test router
   await fastify.register(apiRoutes, { prefix: '/api' })
}

module.exports = fastifyPlugin(app);