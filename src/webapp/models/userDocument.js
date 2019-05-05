const mongoose = require('mongoose');

//User Schema
const UserDocumentSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    file_title: {
        type: String,
        required: true
    },
    file_url:{
        type: String,
        required: true
    },
    file_category:{
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    tags: Date
});

const UserDocumentsModel = module.exports = mongoose.model('userDocument', UserDocumentSchema, 'userDocument');