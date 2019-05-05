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
    var query = "match (n:user{user_name:'"+userName+"'})- [f:FOLLOWING]-> (r:user) return r"
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
    var query = "match (n:user{user_name:'"+userName+"'})<- [f:FOLLOWING]- (r:user) return r"
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
    var query = "match (n:user{user_name:'"+userName+"'})- [f:FOLLOWING]-> (k:user)-[:SKILLED_IN]->(p:skill) return p {.skill_name, users: collect(k {.user_name, .type})}"
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
    var query = "match (n:user{user_name:'"+userName+"'}) - [p:PARTICIPATED_IN] ->(e:event) return n.user_name AS `User Name`, e.event_id As `Event Id`, e.event_name As `Event Name`, e.event_date.day+'/'+e.event_date.month+'/'+e.event_date.year As `Event Date`, CASE p.is_organiser WHEN true THEN 'Organiser' ELSE 'Participant' END As `Participation Type` ORDER BY e.event_date"
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
    var dateAsString = nowDate.getFullYear()+"-"+nowDate.getMonth()+ 1 +"-"+nowDate.getDate();
    var query = "match (a:user{user_name:'"+sourceUser+"'}) match(v:user{user_name:'"+destUser+"'}) create (a) -[f:FOLLOWING {since: date(\""+dateAsString+"\")}] -> (v) return a,v"
    session.run(query).then(function(result){
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields[0].properties);
            returnResults.push(element._fields[1].properties);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

exports.unfollowList = function(req, res,sourceUser, destUser, handleSuccessResponse, handleErrorResponse){
    var query = "match (a:user{user_name:'"+sourceUser+"'})-[f:FOLLOWING]->(v:user{user_name:'"+destUser+"'}) delete f"
        session.run(query).then(function(result){
        handleSuccessResponse(req, res,'User relationship deleted successfully');
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

exports.UsersParticipation = function(req, res,userName, organiser, eventId, handleSuccessResponse, handleErrorResponse){
    var nowDate = new Date();
    var dateAsString = nowDate.getFullYear()+"-"+nowDate.getMonth()+ 1 +"-"+nowDate.getDate();
    var query = "match (a:user{user_name:'"+userName+"'}) match(e:event{event_id:'"+eventId+"'}) create (a) -[:PARTICIPATED_IN {date: date('"+dateAsString+"')";
    if(organiser === 'true' || organiser === 'True') {
        query += ", is_organiser: true";
    }
    query += "}] -> (e) return a,e";
    session.run(query).then(function(result){
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields[0].properties);
            returnResults.push(element._fields[1].properties);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

exports.getUserComments = function (req, res, userName, handleSuccessResponse, handleErrorResponse){
    var query = "match (u:user {user_name:'"+userName+"'}) -[g:GAVE_FEEDBACK]-> (e:event) return u.user_name as `User Name`, e.event_id as `Event Id`, e.event_name As `Event Name`, g.comment as `Comment`, g.rating as `Rating`";

    session.run(query).then(result=> {
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

exports.getEventComments = function (req, res, eventID, handleSuccessResponse, handleErrorResponse){
    var query = "match (e:event {event_id:'"+eventID+"'}) <-[g:GAVE_FEEDBACK]- (u:user) return e.event_id as `Event Id`, e.event_name As `Event Name`, g.comment as `Comment`, g.rating as `Rating`, u.user_name as `User Name`";

    session.run(query).then(result=> {
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

exports.getUserTypeComments = function (req, res, userType, handleSuccessResponse, handleErrorResponse){
    var query = "match (u:user {type:'"+userType+"'}) -[g:GAVE_FEEDBACK]-> (e:event) return u.user_name as `Student User Name`, e.event_id as `Event Id`, e.event_name As `Event Name`, g.comment as `Comment`, g.rating as `Rating`";

    session.run(query).then(result=> {
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

exports.addComment = function(req, res, requestData, handleSuccessResponse, handleErrorResponse){
    var username = requestData.user_name;
    var eventID = requestData.eventID;
    var comment = requestData.comment;
    var rating = requestData.rating;

    var query = "match (u:user {user_name:'"+username+"'}) -[p:PARTICIPATED_IN]-> (e:event {event_id:'"+eventID+"'}) create (u)-[g:GAVE_FEEDBACK {comment:'"+comment+"', rating:'"+rating+"'}]->(e) return u.user_name as `User Name`, e.event_id as `Event Id`, e.event_name As `Event Name`, g.comment as `Comment`, g.rating as `Rating` ";

    session.run(query).then(result=> {
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });

}