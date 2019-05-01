const mongoose = require('mongoose');

//User Schema
const UserMessagesSchema = mongoose.Schema({
    sender_user_name: {
        type: String,
        required: true
    },
    recipient_user_name: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    message_digest:{
        type: String,
        required: true
    },
    sendDatetime: Date,
    deliveredDatetime: Date,
    readDatetime: Date
});

const UserMessagesModel = module.exports = mongoose.model('userMessages', UserMessagesSchema, 'userMessages');