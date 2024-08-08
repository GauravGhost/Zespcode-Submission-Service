const submissionQueue = require("../queues/submissionQueue");
const { SUBMISSION_JOB } = require("../utils/constants");

module.exports = async function (payload) {
  await submissionQueue.add(SUBMISSION_JOB, payload);
  console.log("Successfully added a new submission job!");
}
