const { Worker } = require('bullmq')
const redisConnection = require("../config/redisConfig");
const { default: axios } = require('axios');
const SubmissionRepository = require('../repositories/submissionRepository');
const { SOCKET_SERVICE_URL } = require('../config/serverConfig');


function evaluationWorker(queue) {
    new Worker(queue, async (job) => {
        const repo = new SubmissionRepository();
        if (job.name === "EvaluationJob") {
            try {
                console.log("coming to evaluation worker")
                // Sending the output response to the socket service.

                await axios.post(SOCKET_SERVICE_URL, {
                    userId: job.data.userId,
                    payload: job.data
                });
                const updateStatus = await repo.updateSubmission(job.data.submissionId, { status: job.data.response.status });
            } catch (error) {
                console.log("Evaluatoin worker error", error.message, error.name);

                const updateStatus = await repo.updateSubmission(job.data.submissionId, { status: job.data.response.status });
            }
        }
    },
        { connection: redisConnection }
    )
};

module.exports = evaluationWorker