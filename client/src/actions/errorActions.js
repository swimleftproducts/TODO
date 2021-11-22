import { errorConstants } from "../constants/errorConstants"


const errorActionCreator=(errorType,error)=>{
     if(error){
        
    }
     return {
        type: errorType,
        error:true,
        payload:error
    }
} 

const errorClearAction= ()=>{
    return {
        type: errorConstants.clearError,
    }
}

const isLoadingAction =()=>{
    return{
        type:errorConstants.isLoading
    }
}

const isDoneLoadingAction =()=>{
    return{
        type:errorConstants.isDoneLoading
    }
}


export const errorActions= {
    errorActionCreator,
    errorClearAction,
    isLoadingAction,
    isDoneLoadingAction
 }


