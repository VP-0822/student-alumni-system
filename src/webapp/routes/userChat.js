const express = require('express');
const router = express.Router();

const messageController = require('../controllers/userMessages')

router.get('/messages', function(req, res){
    let sender = req.query.sender;
    let receiver = req.query.receiver;
    if(sender && receiver)
    {
        messageController.searchMessagesForUser(req, res, sender, receiver, handleSuccessResponse, handleErrorResponse);
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
        //res.send(responseData);
        res.render('userChat', responseData);
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