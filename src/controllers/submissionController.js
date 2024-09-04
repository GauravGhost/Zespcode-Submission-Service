// TODO: Add Validation layer
async function createSubmission(req, res) {
    const response = await this.submissionService.addSubmission(req.body);
    return res.code(201).send({
        error: {},
        data: response,
        success: true,
        message: "Created Submission successfully"
    })
}



module.exports = {
    createSubmission
}