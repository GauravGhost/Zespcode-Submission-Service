const {PROBLEM_ADMIN_SERVICE_URL} = require("../config/serverConfig");
const axiosInstance = require('../config/axiosInstance');
const PROBLEM_ADMIN_BASE_URL = `${PROBLEM_ADMIN_SERVICE_URL}/api/v1`;

async function fetchProblemDetails(problemId) {
    try {
        const uri = `${PROBLEM_ADMIN_BASE_URL}/problems/${problemId}`
        const response = await axiosInstance.get(uri);
        return response.data;
    } catch (e) {
        console.error("Something went wrong while fetching problem details")
        console.error(e);
    }
}

module.exports = {fetchProblemDetails};