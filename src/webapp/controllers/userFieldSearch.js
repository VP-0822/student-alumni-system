const UserAccountModel = require('../models/userAccount');

exports.searchProjectMembers = function (req, res, projectName, handleSuccessResponse, handleErrorResponse) {
    UserAccountModel.find({"education_background.projects.name": projectName},{"education_background.projects.members.name":1}).lean().exec(function (err, report) {
        if (err) {
            handleErrorResponse(req, res, err)
        }
        handleSuccessResponse(req, res, report);
    });
}