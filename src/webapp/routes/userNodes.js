const express = require('express');
const router = express.Router();

const userNodesController = require('../controllers/userNodes')

router.get('/type/:type', function(req, res){
    var userType = req.params.type;
    userNodesController.searchUsersByType(req, res, userType, handleSuccessResponse, handleErrorResponse); 
});

router.get('/follows/:name', function(req, res){
    var userName = req.params.name;
    userNodesController.getUsersFollowingList(req, res, userName, handleSuccessResponse, handleErrorResponse); 
});

router.get('/followers/:name', function(req, res){
    var userName = req.params.name;
    userNodesController.getUsersFollowersList(req, res, userName, handleSuccessResponse, handleErrorResponse); 
});

router.get('/followerskill/:name', function(req, res){
    var userName = req.params.name;
    userNodesController.getUsersFollowersSkillList(req, res, userName, handleSuccessResponse, handleErrorResponse); 
});

router.get('/events/:name', function(req, res){
    var userName = req.params.name;
    userNodesController.getUsersEventsList(req, res, userName, handleSuccessResponse, handleErrorResponse); 
});


router.get('/createfollower', function(req, res){
    var sourceUser = req.query.sourceUser;
    var destUser = req.query.destUser;
    userNodesController.setUsersFollowers(req, res, sourceUser, destUser, handleSuccessResponse, handleErrorResponse); 
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