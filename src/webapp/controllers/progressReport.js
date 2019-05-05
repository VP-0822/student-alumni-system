const progressReport = require('../models/progressReport');

exports.gettop5score = function (req, res, moduleName, handleSuccessResponse, handleErrorResponse) {
    

    progressReport.aggregate([
        { $unwind: "$module" },
        { $unwind: "$module.attempts" },
        { $sort: { "module.attempts.score": 1 } },
        { $match: { "module.module_name": moduleName } },
        { $limit: 5 }
    ]).exec(function (err, report) {
        if (err) {
            handleErrorResponse(req, res, err)
        }
        

        handleSuccessResponse(req, res, report);
    });
}