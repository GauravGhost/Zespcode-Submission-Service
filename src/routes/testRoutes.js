async function testRoute(fastify, options) {
    fastify.get("/ping", (req, res) => {
        return res.send({data: "pong"})
    })
}

module.exports = testRoute;