const SubmissionProducer = require('../producers/submissionQueueProducer')
const { fetchProblemDetails } = require("../apis/problemAdminApi");
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
        const userId = submission.userId;
        const problemAdminApiResponse = await fetchProblemDetails(problemId);
        if (!problemAdminApiResponse) {
            throw new Error("Failed to fetch the problem details");
        }
        const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(codeStub => codeStub.languageSlug.toLowerCase() === submission.language.toLowerCase());
        submission.code = codeCreator(languageCodeStub.startSnippet, submission.code, languageCodeStub.endSnippet);
        const response = await this.submissionRepository.createSubmission(submission);
        if (!response) {
            // TODO: Add error handling
            throw { message: "Not able to create submission" }
        }
        console.log(response);
        const queueResponse = await SubmissionProducer({
            [response._id]: {
                code: submission.code,
                language: submission.language,
                testCases: problemAdminApiResponse.data.testCases,
                userId: userId,
                submissionId: response._id,
            }
        });

        // TODO: Add Handling for all the testcases.
        return { queueResponse, response: response };
    }

    async updateSubmission(id, submissionPayload) {
        try {
            if (!id || !submissionPayload) {
                throw new Error("Invalid submission id or submission payload")
            }
            const response = await this.submissionRepository.updateSubmission(id, submissionPayload);
            return response;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = SubmissionService