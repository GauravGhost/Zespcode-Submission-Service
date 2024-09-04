const { Worker } = require('bullmq')
const redisConnection = require("../config/redisConfig");
const { default: axios } = require('axios');
const SubmissionRepository = require('../repositories/submissionRepository');


function evaluationWorker(queue) {
    new Worker(queue, async (job) => {
        const repo = new SubmissionRepository();
        if (job.name === "EvaluationJob") {
            console.log("job working", job.data);
            try {
                const response = await axios.post("http://localhost:6000/sendPayload", {
                    userId: job.data.userId,
                    payload: job.data
                });
                const updateStatus = await repo.updateSubmission(job.data.submissionId, { status: job.data.response.status });
                console.log(updateStatus);
            } catch (error) {
                console.log(error.message, error.name);
                console.log("updated status", job.data.submissionId, job.data.response.status);
                const updateStatus = await repo.updateSubmission(job.data.submissionId, { status: "ERROR" });
                console.log(updateStatus);
            }
        }
    },
        { connection: redisConnection }
    )
};

module.exports = evaluationWorker