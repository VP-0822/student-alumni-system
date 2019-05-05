const userAccount = require('../models/userAccount');

exports.searchProjectMembers = function (req, res, projectName, handleSuccessResponse, handleErrorResponse) {
    

    userAccount.find(
        {"education_background.projects.name":projectName},{"education_background.projects.members.name":1
        }
    
        ).exec(function (err, report) {
        if (err) {
            handleErrorResponse(req, res, err)
        }
        

        handleSuccessResponse(req, res, report);
    });
}