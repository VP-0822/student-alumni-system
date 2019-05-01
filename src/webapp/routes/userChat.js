const express = require('express');
const router = express.Router();

const messageController = require('../controllers/userMessages')

router.get('/messages/:username', function(req, res){
    let username = req.params.username;
    if(username)
    {
        messageController.searchMessagesForUser(req, res, username, handleSuccessResponse, handleErrorResponse);
        return;
    }
    handleErrorResponse(req, res, new Error('Invalid username'));
})

function handleSuccessResponse(req, res, responseData, displayMessage)
{
    if(displayMessage)
    {
        req.flash('success', displayMessage);
    }
    if(responseData)
    {
        res.send(responseData)
        return;
    }
    res.sendStatus(200);
}

function handleErrorResponse(req, res, err)
{
    req.flash('error', err.message);
    res.sendStatus(500);
}

module.exports = router;