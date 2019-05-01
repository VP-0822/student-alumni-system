const UserMessagesModel = require('../../models/userMessages');

exports.searchMessagesForUser = function(req, res, username, handleSuccessResponse, handleErrorResponse){
    UserMessagesModel.find({$or: [{"sender_user_name" : username}, {"recipient_user_name" : username}]}).lean().exec(function(err, docs){
        if(err)
        {
            handleErrorResponse(req, res, err)
            return
        }
        handleSuccessResponse(req, res, docs)
    });
    return
}