import axios from "axios";
import history from '../history'
import {authConstants} from "../constants/authConstants";
import { userConstants } from "../constants/userConstants";
import { userActions } from "./userActions";
import { errorActions } from "./errorActions";
import { errorConstants } from "../constants/errorConstants";





const login = (formData)=>async(dispatch)=>{
    
    try{
        dispatch(errorActions.isLoadingAction())

        const User = await axios.post('/api/login',formData,
       { withCredentials: true })
       
       dispatch(errorActions.isDoneLoadingAction())
       if(User.data.authenticated){
            dispatch({type:userConstants.setUser,payload:User.data.user})
            dispatch({type:authConstants.login, payload:true})
            dispatch(errorActions.errorActionCreator(errorConstants.clearError,))
            history.push('/homepage')
        } else{
               
        }
    }
    catch(err){
       
       dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))
    }    
    
}
const register = (formData)=>async(dispatch)=>{
    try{
        dispatch(errorActions.isLoadingAction())

        const newUser = await axios.post('/api/register',formData,
       { withCredentials: true })
        if(newUser.data.authenticated){
            dispatch({type:authConstants.login, payload:newUser.data.authenticated})
            dispatch({type:userConstants.setUser,payload:newUser.data.user})
            dispatch(errorActions.errorActionCreator(errorConstants.clearError))
            dispatch(errorActions.errorActionCreator(errorConstants.isDoneLoading))
            history.push('/homepage')
        }    
    }
    catch(err){
        dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))
    }    
}
const isAuthenticated = ()=>async(dispatch)=>{
    try{
        dispatch(errorActions.isLoadingAction())

        const authStatus = await axios.get('/api/isauthenticated',
       { withCredentials: true })
        
        if(authStatus.data.authenticated){
            
            dispatch({type:userConstants.setUser,payload:authStatus.data.user})
            
            dispatch({type:authConstants.login, payload:authStatus.data.authenticated})
            history.push('/homepage')
        }    
        dispatch(errorActions.isDoneLoadingAction())
    }
    catch(err){
        
        dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))

    }    
}

const logout = ()=> async (dispatch)=>{
    await axios.post('/api/logout',{},
    { withCredentials: true })
    .then((params) => {
        dispatch(userActions.clearUser())
        dispatch({type:authConstants.logout,payload:false}) 
        history.push('/')
    }).catch(((err) => {
        dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))
        if(err.response.data.errors.internalErrorCode===2000){
            dispatch(userActions.clearUser())
            dispatch({type:authConstants.logout,payload:false}) 
            history.push('/')
        }
    })) 
}



export const authActions={
    login,
    logout,
    register,
    isAuthenticated
}