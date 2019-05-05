const mongoose = require('mongoose');

const AttemptSchema = mongoose.Schema({
    attempt_no: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    }
});

const ModuleSchema = mongoose.Schema({
    module_name: {
        type: String,
        required: true
    },
    attempts: [AttemptSchema]
});

const ProgressReportSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    module: [ModuleSchema]
});

module.exports = mongoose.model('progressReport', ProgressReportSchema, 'progressReport');