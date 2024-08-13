const app = require('./app');
const { connectToDB } = require('./config/dbConfig');
const serverConfig = require('./config/serverConfig');
const fastify = require('fastify')({logger: true})

const PORT = serverConfig.PORT
fastify.register(app);

fastify.listen({port: PORT}, async (err)=> {
    if(err){
        fastify.log.error(err);
        process.exit(1);
    }
    await connectToDB();

    console.log(`Server is up at port ${PORT} and connected to database`);
})