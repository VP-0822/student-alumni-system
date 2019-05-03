const neo4j = require('neo4j-driver').v1;

exports.createChannel = function(req, res, requestData, handleSuccessResponse, handleErrorResponse){
    var userName = requestData.userName;
    var channelName = requestData.channelName;
    var nowDate = new Date();
    var queryDateAsString = nowDate.getFullYear()+"-"+nowDate.getMonth() + 1 +"-"+nowDate.getDate();
    var category = requestData.category;
    var tags = requestData.tags;
    var query = "create (c:channel {channel_name:'"+channelName+"', category: '"+category+"', tags: "+tags+", creation_date: date('"+queryDateAsString+"')})"

    session.run(query).then(function(result){
        _followChannel(req, res, userName, channelName, queryDateAsString, true, false, handleSuccessResponse, handleErrorResponse);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

function _followChannel(req, res, userName, channelName, queryDateAsString, isOwner, isModerator, handleSuccessResponse, handleErrorResponse) {
    var query = "match (u:user {name:'"+userName+"'}), (c:channel {channel_name:'"+channelName+"'}) create (u) -[:FOLLOWS {since:date('"+queryDateAsString+"'), is_owner: "+isOwner+", is_moderator: "+isModerator+"}] -> (c) return u,c"
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

exports.followChannel = function(req, res, requestData, handleSuccessResponse, handleErrorResponse){
    var userName = requestData.userName;
    var channelName = requestData.channelName;
    var nowDate = new Date();
    var queryDateAsString = nowDate.getFullYear()+"-"+nowDate.getMonth() + 1 +"-"+nowDate.getDate();
    var isOwner = !!requestData.isOwner;
    var isModerator = !!requestData.isModerator;
    _followChannel(req, res, userName, channelName, queryDateAsString, isOwner, isModerator, handleSuccessResponse, handleErrorResponse);
}

exports.getFollowedChannels = function(req, res, username, isOwner, isModerator, handleSuccessResponse, handleErrorResponse){
    var query = "match (u:user {name:'"+username+"'}) ";
    query += "-[:FOLLOWS";
    if(isOwner || isModerator) {
        query += "{";
        if(isOwner) {
            query += "is_owner: true";
        }
        if(isOwner && isModerator) {
            query += ", ";
        }
        if(isModerator) {
            query += "is_moderator:true";
        }
        query += "}";
    }
    query += '] -> (c:channel) return c.channel_name AS `Channel Name`,  c.creation_date.day +'/'+c.creation_date.month+'/'+c.creation_date.year AS `Date of Creation`';
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
}

exports.createNewPost = function(req, res, requestData, handleSuccessResponse, handleErrorResponse){
    var userName = requestData.userName;
    var channelName = requestData.channelName;
    var nowDate = new Date();
    var queryDateAsString = nowDate.getFullYear()+"-"+nowDate.getMonth() +1 +"-"+nowDate.getDate();
    var postData = requestData.postData;
    var tags = requestData.tags;
    var view = requestData.view;

    var query = "match (u:user {name:'"+userName+"'}), (c:channel {channel_name:'"+channelName+"'}) create (u) -[:CREATED {date:date('"+queryDateAsString+"')}]-> (p:post {data:'"+postData+"', tags:"+tags+"}) -[:ON {view:'"+view+"'}]-> (c) return u,c,p"
    session.run(query).then(function(result){
        var returnResults = [];
        result.records.forEach(element => {
            returnResults.push(element._fields[0].properties);
            returnResults.push(element._fields[1].properties);
            returnResults.push(element._fields[2].properties);
        });
        handleSuccessResponse(req, res, returnResults);
    }).catch(function(err){
        handleErrorResponse(req, res, err);
    });
}

exports.getPosts = function(req, res, channelName, view, handleSuccessResponse, handleErrorResponse){
    var query = "match (c:channel {channel_name:'"+channelName+"'}) <-";
    query += "[:ON ";
    if(view && (view === 'public' || view === 'private')) {
        query += "{view ='"+view+"'}";
    }
    query += "]- (p:post) <-[t:CREATED] - (u:user) return u.name AS `User Name`, p.data AS `Post`, t.date.day+'/'+t.date.month+'/'+t.date.year AS `Post date`";
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
}