async function createSubmission(req, res) {
    const response = await this.submissionService.addSubmission(req.body);

}

module.exports = {
    createSubmission
}