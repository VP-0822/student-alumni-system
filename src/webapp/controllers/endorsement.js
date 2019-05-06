exports.endorsingUsers = function(req, res, userName, handleSuccessResponse, handleErrorResponse){
    var query ="MATCH(a:user{ user_name:'"+userName+"' } ) MATCH (a) <-[en:ENDORSED]-(u:user) RETURN u.user_name as PersonEndorsingMe, en.topic as Topic, en.rating as Rating"   
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