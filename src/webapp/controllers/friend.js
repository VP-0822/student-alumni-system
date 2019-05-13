
exports.findFriendsInCommon = function(req, res, userName, handleSuccessResponse, handleErrorResponse){
    var query ="MATCH (me:user {user_name:'"+userName+"'})-[:FOLLOWING]->(myFriend:user)-[:FOLLOWING]-(friendOfFriend:user) WHERE NOT (me)-[:FOLLOWING]-(friendOfFriend:user)  RETURN count(friendOfFriend) as `friendsInCommon`, friendOfFriend.user_name as `suggestedFriend` ORDER BY friendsInCommon DESC"
    session.run(query).then(function(result){
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
}
