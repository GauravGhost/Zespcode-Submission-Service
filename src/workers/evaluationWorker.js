const { Worker } = require('bullmq')
const redisConnection = require("../config/redisConfig");
const { default: axios } = require('axios');


function evaluationWorker(queue) {
    new Worker(queue, async (job) => {
        if (job.name === "EvaluationJob") {
            console.log("job working", job.data);
            try {
                const response = await axios.post("http://localhost:6000/sendPayload", {
                    userId: job.data.userId,
                    payload: job.data
                });
                console.log(response.data);
            } catch (error) {
                console.log(error.message, error.name);
            }
        }
    },
        { connection: redisConnection }
    )
};

module.exports = evaluationWorker