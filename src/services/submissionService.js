const SubmissionProducer = require('../producers/submissionQueueProducer')
const {fetchProblemDetails} = require("../apis/problemAdminApi");
const codeCreator = require('../utils/codeCreator')

class SubmissionService {
    constructor(submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    async pingCheck() {
        return 'pong'
    }

    async addSubmission(submission) {
        const problemId = submission.problemId;
        const problemAdminApiResponse = await fetchProblemDetails(problemId);
        if (!problemAdminApiResponse) {
            throw new Error("Failed to fetch the problem details");
        }
        const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(codeStub => codeStub.language.toLowerCase() === submission.language.toLowerCase());
        submission.code = codeCreator(languageCodeStub.startSnippet, submission.code, languageCodeStub.endSnippet);

        const response = this.submissionRepository.createSubmission(submission);
        if (!response) {
            // TODO: Add error handling
            throw {message: "Not able to create submission"}
        }
        const queueResponse = await SubmissionProducer(submission);
        return {queueResponse, response: response};
    }
}

module.exports = SubmissionService