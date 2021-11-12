import axios from "axios";
import history from '../history'
import {authConstants} from "../constants/authConstants";
import { userConstants } from "../constants/userConstants";
import { userActions } from "./userActions";



const login = (formData)=>async(dispatch)=>{
    
    try{
        const User = await axios.post('/api/login',formData,
       { withCredentials: true })
       
       if(User.data.authenticated){
              dispatch({type:userConstants.setUser,payload:User.data.user})
            dispatch({type:authConstants.login, payload:true})
            
            history.push('/homepage')
        } else{
            history.push('/register')
        }
    }
    catch(err){
        console.log(err)
    }    
    
}
const register = (formData)=>async(dispatch)=>{
    console.log(formData)
    try{
        const newUser = await axios.post('/api/register',formData,
       { withCredentials: true })
        console.log(newUser)
        if(newUser.data.authenticated){
            
            dispatch({type:authConstants.login, payload:newUser.data.authenticated})
            dispatch({type:userConstants.setUser,payload:newUser.data.user})
            history.push('/homepage')
        }    
    }
    catch(err){
        console.log(err)
    }    
}
const isAuthenticated = ()=>async(dispatch)=>{
   console.log('in isAuthenticated')
    try{
        const authStatus = await axios.get('/api/isauthenticated',
       { withCredentials: true })
        
        if(authStatus.data.authenticated){
            console.log('setting user')
            dispatch({type:userConstants.setUser,payload:authStatus.data.user})
            console.log('setting auth')
            dispatch({type:authConstants.login, payload:authStatus.data.authenticated})
            history.push('/homepage')
        }    
    }
    catch(err){
        console.log(err)
    }    
}

const logout = ()=> async (dispatch)=>{
    try{
       console.log('inlogout')
        await axios.post('/api/logout',{},
       { withCredentials: true })
        dispatch(userActions.clearUser())
        dispatch({type:authConstants.logout,payload:false}) 
        history.push('/')
    }catch(err){
        console.log(err)
    }
}



export const authActions={
    login,
    logout,
    register,
    isAuthenticated
}