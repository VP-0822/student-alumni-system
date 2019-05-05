const express = require('express');
const router = express.Router();

const messageController = require('../controllers/progressReport')
router.get('/top5score', function(req, res){
    let moduleName=req.query.modulename;
    
    messageController.gettop5score(req, res, moduleName, handleSuccessResponse, handleErrorResponse);
});
function handleSuccessResponse(req, res, responseData, displayMessage)
{

    console.log("success")
    if(displayMessage)
    {
        req.flash('success', displayMessage);
    }
    if(responseData)
    {
        res.send(responseData);
      //  res.render('userChat', responseData);
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