exports.searchUsersByType = function(req, res, type, handleSuccessResponse, handleErrorResponse){
    var query = "match(n:user {type:'"+type+"'}) return n"
    //"match(n:user{type:'student', name:'viraj'}) return n"
    session.run(query).then(function(result){
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields[0].properties);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

exports.getUsersFollowingList = function(req, res, userName, handleSuccessResponse, handleErrorResponse){
    var query = "match (n:user{name:'"+userName+"'})- [f:FOLLOWING]-> (r:user) return r"
    //"match(n:user{type:'student', name:'viraj'}) return n"
    session.run(query).then(function(result){
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields[0].properties);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

exports.getUsersFollowersList = function(req, res, userName, handleSuccessResponse, handleErrorResponse){
    var query = "match (n:user{name:'"+userName+"'})<- [f:FOLLOWING]- (r:user) return r"
    //"match(n:user{type:'student', name:'viraj'}) return n"
    session.run(query).then(function(result){
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields[0].properties);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}