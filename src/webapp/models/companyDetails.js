const mongoose = require('mongoose');


const CompanyDetailsSchema = mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    company_details: {
        type: String,
        required: true
    },
    domains:{
        type: Array,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: true
    },
    
});

const CompanyDetailsModel = module.exports = mongoose.model('companyDetails', CompanyDetailsSchema , 'companyDetails');