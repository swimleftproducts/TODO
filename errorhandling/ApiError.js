class ApiError {
    constructor(code,message,description,internalErrorCode){
        this.code=code,
        this.message=message,
        this.errors={
            description:description,
            internalErrorCode
        }
    }

    static badRequest(msg,description,internalErrorCode){
        return new ApiError(400, msg,description,internalErrorCode)
    }

    static internal(msg,description,internalErrorCode){
        return new ApiError(500,msg,description,internalErrorCode)
    }

    static badCredentials(msg,description,internalErrorCode){
        return new ApiError(401,msg,description,internalErrorCode)
    }

    static existingCredentials(msg,description,internalErrorCode){
        return new ApiError(403,msg,description,internalErrorCode)
    }

    static noPermission(msg,description,internalErrorCode){
        return new ApiError(403,msg,description,internalErrorCode)
    }

}

module.exports =ApiError

