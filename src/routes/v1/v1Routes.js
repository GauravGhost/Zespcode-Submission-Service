const testRoutes = require('./testRoutes')
const submissionRoutes = require('./submissionRoutes')
async function v1Routes(fastify, options) {
    fastify.register(testRoutes, {prefix: '/tests'})
    fastify.register(submissionRoutes, {prefix: '/tests'})
}

module.exports = v1Routes;