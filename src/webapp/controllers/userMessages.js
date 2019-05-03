const UserMessagesModel = require('../models/userMessages');

exports.searchMessagesForUser = function(req, res, sender, receiver, handleSuccessResponse, handleErrorResponse){
    UserMessagesModel.find({$and: [{"sender_user_name" : {$in: [sender, receiver]}}, {"recipient_user_name" : {$in: [sender, receiver]}}]}).sort({"sendDatetime": 1}).lean().exec(function(err, responseData){
        if(err)
        {
            handleErrorResponse(req, res, err)
            return
        }
        handleSuccessResponse(req, res, {docs: responseData, org_sender: sender, org_receiver: receiver})
    });
    return
}