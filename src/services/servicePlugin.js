const TestService = require('./submissionService');
const fastifyPlugin = require('fastify-plugin');

async function servicePlugin(fastify, options){
    fastify.decorate('submissionService', new TestService());
}


module.exports = fastifyPlugin(servicePlugin);