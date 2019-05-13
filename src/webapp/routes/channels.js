const express = require('express');
const router = express.Router();

const channelController = require('../controllers/channels');

router.post('/create', function(req, res){
    var requestData = req.body;
    channelController.createChannel(req, res, requestData, handleSuccessResponse, handleErrorResponse);
});

router.post('/follow', function(req, res){
    var requestData = req.body;
    channelController.followChannel(req, res, requestData, handleSuccessResponse, handleErrorResponse)
});

router.get('/followed', function(req, res){
    var username = req.query.userName;
    var isOwner = req.query.isOwner;
    var isModerator = req.query.isModerator;
    channelController.getFollowedChannels(req, res, username, isOwner, isModerator, handleSuccessResponse, handleErrorResponse);
});

router.post('/newPost', function(req, res){
    var requestData = req.body;
    channelController.createNewPost(req, res, requestData, handleSuccessResponse, handleErrorResponse)
});

router.get('/posts', function(req,res) {
    var channelId = req.query.channelId;
    var view = req.query.view;
    channelController.getPosts(req, res, channelId, view, handleSuccessResponse, handleErrorResponse);
});
function handleSuccessResponse(req, res, responseData)
{
    if(responseData)
    {
        res.send(responseData)
        return;
    }
    res.sendStatus(200);
}

function handleErrorResponse(req, res, err)
{
    console.log(err);
    res.sendStatus(500);
}

module.exports = router;