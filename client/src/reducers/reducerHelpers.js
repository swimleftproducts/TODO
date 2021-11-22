export const reducerHelpers ={
    //logic for handling errors in application
    errors: (state,action)=>{
        
        if(!action.error){
            return {
                ...state,
                error: null
            }
        }
        return{
            ...state,
            exists:true,
            errorDetails:action.payload          
        }
    }
}