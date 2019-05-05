const express = require('express');
const router = express.Router();

const messageController = require('../controllers/userFieldSearch')

router.get('/projectmembers', function(req, res){
    let projectName = req.query.projectname;
    messageController.searchProjectMembers(req, res, projectName, handleSuccessResponse, handleErrorResponse);
        
});
    

function handleSuccessResponse(req, res, responseData, displayMessage)
{
    if(displayMessage)
    {
        req.flash('success', displayMessage);
    }
    if(responseData)
    {
        res.send(responseData);
        
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