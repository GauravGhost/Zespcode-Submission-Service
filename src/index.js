const app = require('./app');
const serverConfig = require('./config/serverConfig');
const fastify = require('fastify')({logger: true});
const {connectToDB} = require('./config/dbConfig');
const evaluationWorker = require('./workers/evaluationWorker');


const PORT = serverConfig.PORT
fastify.register(app);

fastify.listen({port: PORT, host: '0.0.0.0'}, async (err)=> {
    if(err){
        fastify.log.error(err);
        process.exit(1);
    }
    await connectToDB();
    evaluationWorker("EvaluationQueue");
    console.log(`Server is up at port ${PORT}`);
    console.log(`Server is up at port ${PORT} and connected to database`);
})