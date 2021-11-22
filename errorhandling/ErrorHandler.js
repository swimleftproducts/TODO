const ApiError = require("./ApiError")

function apiErrorHandler(err,req,res,next){
        // dont use in production because not async
        console.error("the error is", err)

        if(err instanceof ApiError){
            res.status(err.code).json(err)
            return;
        }

        res.status(500).json('something went wrong')
}

module.exports = apiErrorHandler;
