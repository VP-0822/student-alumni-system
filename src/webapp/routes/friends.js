const express = require('express');
const router = express.Router();

const friendsController = require('../controllers/friend');

router.get('/inCommon', function(req, res){
    var userName = req.query.userName;
    friendsController.findFriendsInCommon(req, res, userName, handleSuccessResponse, handleErrorResponse);
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