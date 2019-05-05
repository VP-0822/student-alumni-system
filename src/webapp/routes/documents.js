const express = require('express');
const router = express.Router();

const documentController = require('../controllers/documents');

router.get('/tags', function(req, res){
    var userName = req.query.userName;
    var fileName = req.query.fileName;
    documentController.getDocumentTags(req, res, userName, fileName, handleSuccessResponse, handleErrorResponse);
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