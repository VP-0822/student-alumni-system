
exports.findFriendsInCommon = function(req, res, userName, handleSuccessResponse, handleErrorResponse){
    var query = "MATCH (me:user)-[:FOLLOWS]-(myFriend:user)-[:FOLLOWS]-(friendOfFriend:user) WHERE NOT (me)-[:FOLLOWS]-(friendOfFriend:user) AND me.user_name = \""+userName+"\" RETURN count(friendOfFriend) as friendsInCommon, friendOfFriend.user_name as suggestedFriend ORDER BY friendsInCommon DESC;"
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
