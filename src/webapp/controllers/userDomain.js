const companyDetails = require('../models/companyDetails');
const progressReport = require('../models/userWorkexperience');
exports.getuserDomain = function (req, res, domainName, handleSuccessResponse, handleErrorResponse) {
    companyDetails.aggregate([
        {
           $unwind: "$domains"
        },
       { $match: {"domains":domainName}},
        {
           $lookup:
              {
                 from: "userWorkExperience",
                 localField: "company_name",
                 foreignField: "company_name",
                 as: "userworkexperience"
             }
        },
        {
        $unwind: "$userworkexperience"
     },                                                                                                                                           
        { $group: {_id:"$domains",listofusers: {$addToSet : "$userworkexperience.user_name"}}}   
     ]).exec(function (err, report) {
        if (err) {
            handleErrorResponse(req, res, err)
        }
        

        handleSuccessResponse(req, res, report);
    });
}