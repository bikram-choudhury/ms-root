const mongoose = require('mongoose');
const candidate_schema = mongoose.Schema({
    candidateName: {
        type: String,
        required: true
    },
    instituteName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    batchType: {
        type: String,
        required: true
    },
    sessionTimings: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: 'running'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('enrollcandidates', candidate_schema);