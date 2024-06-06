async function apiPlugin(fastify, options){
    fastify.register(require('./test/testRoutes'), {prefix: '/test'})
}


module.exports = apiPlugin