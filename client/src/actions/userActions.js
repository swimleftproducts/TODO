import {userConstants} from "../constants/userConstants";
import {authConstants} from '../constants/authConstants'
import axios from "axios";
import history from '../history'
import { errorActions } from "./errorActions";
import { errorConstants } from "../constants/errorConstants";
import { s3Helpers } from "../helpers/s3Helpers";

const setUser = (user)=>async(dispatch)=>{
    dispatch({type:userConstants.setUser, payload:user})
}

const clearUser = ()=>async(dispatch)=>{
    dispatch({type:userConstants.clearUser, payload:{}})
}

const createTodo = (formData,userId,setShowCreate,file) => async(dispatch) => {
    dispatch(errorActions.isLoadingAction())
    if(file){
    const response = await s3Helpers.getPresignedUrl(file)
    const {URL,imgKey,code} = response
    //if no error key on response object
    if(!code){
      const outcome = await s3Helpers.uploadPhoto(URL,file)
      formData.imgKey=imgKey
      if(outcome==="error"){
        dispatch(errorActions.isDoneLoadingAction())
        dispatch(errorActions(errorConstants.error,{
            code:500,
            message:"error uploading image",
            errors:{
                description:"AWS upload error",
                internalErrorCode:3000
            }
          }))
      }
    }else{
        dispatch(errorActions.isDoneLoadingAction())
        dispatch(errorActions.errorActionCreator(errorConstants.error,response))
    }
    }

    await axios.post('/api/create',formData,
    { withCredentials: true }).then((response) => {
        dispatch({type:userConstants.addTodo,payload:response.data})
        setShowCreate(false)
        dispatch(errorActions.isDoneLoadingAction())
    }).catch((err)=>{     
        dispatch(errorActions.isDoneLoadingAction()) 
        dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))
        if(err.response.data.errors.internalErrorCode===2000){
               dispatch(userActions.clearUser())
            dispatch({type:authConstants.logout,payload:false}) 
            history.push('/')
        }
       })  
}

const editTodo = (formData,id,setShowEdit,file) => async(dispatch) => {
    dispatch(errorActions.isLoadingAction())

    //check if user wants to update file
    let outcome="" 
    if(file){
        const response = await s3Helpers.getPresignedUrl(file)
        const {URL,imgKey,code} = response
        //if no error key on response object
        if(!code){
            outcome = await s3Helpers.uploadPhoto(URL,file)
            
            formData.imgKey=imgKey
            if(outcome==="error"){
                dispatch(errorActions.errorActionCreator(errorConstants.error,{
                    code:500,
                    message:"error uploading image",
                    errors:{
                        description:"AWS upload error",
                        internalErrorCode:3000
                    }
                }))
            }
        }else{
            dispatch(errorActions.errorActionCreator(errorConstants.error,response))
        }
    }
    // if upload errors out with a error from AWS then abort updating the todo
    if(outcome==="error"){return}
    
    const body= {id,...formData}
     
    await axios.put('/api/edit',body,
    { withCredentials: true })
    .then((todo) => {
        dispatch({type:userConstants.editTodo,payload:todo.data})
        setShowEdit(0)
        dispatch(errorActions.isDoneLoadingAction())
    })
    .catch((err) => {
        dispatch(errorActions.isDoneLoadingAction())
        dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))
        if(err.response.data.errors.internalErrorCode===2000){
            dispatch(userActions.clearUser())
            dispatch({type:authConstants.logout,payload:false}) 
            history.push('/')
        }
    })
}

const editUser =(formData,userId) => async(dispatch)=>{
    dispatch(errorActions.isLoadingAction())
    const {name,email,password}= formData
    if(name.length===0 && email.length===0 && password.length===0){
        history.push('/')
    }
    await axios.put('/api/user/edit',{id:userId,name,email,password},
    { withCredentials: true })
    .then((user)=>{
        dispatch({type:userConstants.setUser,payload:user.data.user})
        dispatch(errorActions.isDoneLoadingAction())
        history.push('/')
    })
    .catch((err)=>{
        dispatch(errorActions.isDoneLoadingAction())      
        dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))
        if(err.response.data.errors.internalErrorCode===2000){
            dispatch(userActions.clearUser())
            dispatch({type:authConstants.logout,payload:false}) 
            history.push('/')
        }
       })  
}

const changeProgress =(direction,id) =>async (dispatch)=> {
        dispatch({type:userConstants.changeProgress,payload:{direction,id}})
        axios.put('/api/progress',{id, direction},{ withCredentials: true })
        .then (() => {
            history.push('/homepage')
        })
        .catch((err) => {
            dispatch(errorActions.isDoneLoadingAction())
            direction===1?direction=0:direction=1
            dispatch({type:userConstants.changeProgress,payload:{direction,id}})
            dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))
            if(err.response.data.errors.internalErrorCode===2000){
                dispatch(userActions.clearUser())
                dispatch({type:authConstants.logout,payload:false}) 
                history.push('/')
            }
        })
        
        
       

}

const deleteUser = (id) => async(dispatch)=>{
        dispatch(errorActions.isLoadingAction())
        axios.delete('/api/user/delete/'+id,{ withCredentials: true })
        .then((confirm) => {
            
            dispatch(errorActions.isDoneLoadingAction())
            dispatch({type:userConstants.clearUser,payload:{}})
            dispatch({type:authConstants.logout,payload:false}) 
            history.push('/')
        })
        .catch((err) => {
            dispatch(errorActions.isDoneLoadingAction())
            dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))
            if(err.response.data.errors.internalErrorCode===2000){
                dispatch(userActions.clearUser())
                dispatch({type:authConstants.logout,payload:false}) 
                history.push('/')
            }
        })
        
  
}

const deleteTodo =(id,setShowEdit) =>async (dispatch)=>{
    dispatch(errorActions.isLoadingAction())
    axios.delete('/api/delete/'+id,{ withCredentials: true })
    .then((confirm) => {
       dispatch(errorActions.isDoneLoadingAction())
       setShowEdit(0)
       dispatch({type:userConstants.setUser,payload:confirm.data.user})    
        
    })
    .catch((err) => {
        dispatch(errorActions.isDoneLoadingAction())
        dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))
        setShowEdit(0)
        if(err.response.data.errors.internalErrorCode===2000){
            dispatch(userActions.clearUser())
            dispatch({type:authConstants.logout,payload:false}) 
            history.push('/')
        }
    })          
}

const organizeTodos = (method,direction) =>async (dispatch)=>{
        dispatch(errorActions.isLoadingAction())
        await axios.get(`/api/todos/${method}/${direction||1}`,{ withCredentials: true })
        .then(({data}) => {
            dispatch(errorActions.isDoneLoadingAction())
            dispatch({type:userConstants.setTodos,payload:data})
        })
        .catch((err) => {
            dispatch(errorActions.isDoneLoadingAction())
            dispatch(errorActions.errorActionCreator(errorConstants.error,err.response.data))
            if(err.response.data.errors.internalErrorCode===2000){
                dispatch(userActions.clearUser())
                dispatch({type:authConstants.logout,payload:false}) 
                history.push('/')
            }
        })         
  
}

export const userActions= {
    setUser,
    clearUser,
    createTodo,
    editTodo,
    editUser,
    changeProgress,
    deleteUser,
    deleteTodo,
    organizeTodos
}