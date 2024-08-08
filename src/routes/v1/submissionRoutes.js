async function submissionRoutes(fastify, options) {
    fastify.get('/', async (req, res) => {
        return {data: ["todo"]}
    })
}

module.exports = submissionRoutes;