const mongoose = require('mongoose');


const UserWorkExperienceSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    company_name:{
        type: String,
        required: true
    },
    job_description:{
        type: String,
        required: true
    },
    start_date:{
        type: String,
        required: true
    },
    end_date:{
        type: String,
        required: true
    },
});

const UserWorkExperienceModel = module.exports = mongoose.model('UserWorkExperience', UserWorkExperienceSchema , 'UserWorkExperience');