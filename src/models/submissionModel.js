const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User id for the submission is missing"]
    },
    problemId: {
        type: String,
        required: [true, "Problem id for the submission is missing"]
    },
    code: {
        type: String,
        required: [true, "Code id for the submission is missing"]
    },
    language: {
        type: String,
        required: [true, "Language id for the submission is missing"]
    },
    status: {
        type: String,
        Enum: ["Pending", "Success", "RE", "TLE", "MLE", "WA"],
        default: "Pending"

    }
})

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;