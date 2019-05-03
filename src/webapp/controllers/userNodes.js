const neo4j = require('neo4j-driver').v1;

exports.searchUsersByType = function(req, res, type, handleSuccessResponse, handleErrorResponse){
    var query = "match(n:user {type:'"+type+"'}) return n"
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

exports.getUsersFollowersSkillList = function(req, res, userName, handleSuccessResponse, handleErrorResponse){
    var query = "match (n:user{name:'"+userName+"'})- [f:FOLLOWING]-> (k:user)-[:SKILLED_IN]->(p:skill) return p {.skill_name, users: collect(k {.name, .type})}"
    session.run(query).then(function(result){
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields[0]);
            //returnResults.push(element._fields[1].properties);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

exports.getUsersEventsList = function(req, res, userName, handleSuccessResponse, handleErrorResponse){
    var query = "match (n:user{name:'"+userName+"'}) - [p:PARTICIPATED_IN] ->(e:event) return n.name AS `User Name`, e.event_id As `Event Id`, e.event_name As `Event Name`, e.event_date.day+'/'+e.event_date.month+'/'+e.event_date.year As `Event Date`, CASE p.is_organiser WHEN true THEN 'Organiser' ELSE 'Participant' END As `Participation Type` ORDER BY e.event_date"
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

exports.setUsersFollowers = function(req, res,sourceUser, destUser, handleSuccessResponse, handleErrorResponse){
    var nowDate = new Date();
    var dateAsString = nowDate.getFullYear()+"-"+nowDate.getMonth()+"-"+nowDate.getDay();
    var query = "match (a:user{name:'"+sourceUser+"'}) match(v:user{name:'"+destUser+"'}) create (a) -[f:FOLLOWING {since: \""+dateAsString+"\"}] -> (v) return a,v"
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