const Submission = require('../models/submissionModel')

class SubmissionRepository{
    constructor() {
        this.submissionModel = Submission;
    }

    async createSubmission(submission){
        const response = await this.submissionModel.create(submission);
        return response;
    }

    async updateSubmission(id, submissionPayload){
        const response = await this.submissionModel.findByIdAndUpdate(id, submissionPayload);
        return response;
    }
}

module.exports = SubmissionRepository;