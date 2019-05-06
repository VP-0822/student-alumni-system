const express = require('express');
const router = express.Router();

const endorsementsController = require('../controllers/endorsement');

router.get('/endorsers', function(req, res){
    var userName = req.query.userName;
    endorsementsController.endorsingUsers(req, res, userName, handleSuccessResponse, handleErrorResponse);
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