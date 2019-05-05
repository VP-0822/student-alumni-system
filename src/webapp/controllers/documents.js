const UserDocumentModel = require('../models/userDocument');

exports.getDocumentTags = function(req, res, userName, fileName, handleSuccessResponse, handleErrorResponse){
    UserDocumentModel.find({"user_name": userName,"file_title": fileName},{file_url:1, tags: 1}).lean().exec(function(err, responseData){
        if(err)
        {
            handleErrorResponse(req, res, err);
            return;
        }
        //match (u:user {user_name: 'vaibhav'}) <-[f:FOLLOWING]- (v:user) -[s:SKILLED_IN]-> (t:skill) where t.skill_name = 'C#' return v.user_name
        if(responseData[0].tags) {
            responseData[0].tags.forEach(function(tag){
                var query = "match (u:user {user_name: 'vaibhav'}) <-[f:FOLLOWING]- (v:user) -[s:SKILLED_IN]-> (t:skill) where t.skill_name = '"+tag+"' return v.user_name as `User Name`";
                session.run(query).then(function(result){
                    var returnResults = [];
                    var tableHeaderKeys;
                    result.records.forEach(element => {
                        tableHeaderKeys = element.keys;
                    });
                    var returnResults = [];
                    result.records.forEach(element => {
                        returnResults.push(element._fields);
                    });
                    handleSuccessResponse(req, res, {tableHeader: tableHeaderKeys, tableItems: returnResults});
                }).catch(function(err){
                    handleErrorResponse(req, res, err);
                });
            });
        }
    });
    return
}