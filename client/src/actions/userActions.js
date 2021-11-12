import {userConstants} from "../constants/userConstants";
import {authConstants} from '../constants/authConstants'
import axios from "axios";
import history from '../history'

const setUser = (user)=>async(dispatch)=>{
    console.log("inside setUser Action",user)
    dispatch({type:userConstants.setUser, payload:user})
}

const clearUser = ()=>async(dispatch)=>{
    console.log("inside clearUser Action")
    dispatch({type:userConstants.clearUser, payload:{}})
}

const createTodo = (formData,userId,setShowCreate) => async(dispatch) => {
    try{
        const response = await axios.post('http://localhost:4002/api/create',formData,
       { withCredentials: true })
    if(response.data.error){
        alert(response.data.error)
        
    }else{
        // dispatch({type:userConstants.setUser,payload:User.data.user})
        dispatch({type:userConstants.addTodo,payload:response.data})
        setShowCreate(false)
    }
    }
    catch(err){
        console.log(err)
    }    
}




const editTodo = (formData,id) => async(dispatch) => {
    const body= {id,...formData}
   if(body.imgKey===""){
       delete body.imgKey
   }
    try{
        console.log("in edit todo", body)
        const User = await axios.put('http://localhost:4002/api/edit',body,
       { withCredentials: true })
        console.log("in edit user", User)
    if(User.data.error){
        history.push('/')
    }else{
        dispatch({type:userConstants.setUser,payload:User.data.user})
            history.push('/')
    }
    }
    catch(err){
        console.log(err)
    }    
}

const editUser =(formData,userId) => async(dispatch)=>{
try{
    const {name,email,password}= formData
    if(name.length===0 && email.length===0 && password.length===0){
        console.log('no update')
        history.push('/')
    }
    const User = await axios.put('http://localhost:4002/api/user/edit',{id:userId,name,email,password},
    { withCredentials: true })
    console.log("returned User ",User)
    if(User.data.error){

    }else{
        dispatch({type:userConstants.setUser,payload:User.data.user})
        history.push('/')
    }

}catch(err){
    console.log(err)
}}

const changeProgress =(direction,id) =>async (dispatch)=> {
    try{
        const User = await axios.put('http://localhost:4002/api/progress',{id, direction},{ withCredentials: true })
        dispatch({type:userConstants.setUser,payload:User.data.user})
        history.push('/homepage')
    }catch(err){
        console.log(err)
    }
}

const deleteUser = (id) => async(dispatch)=>{
    try{
        const Confirm = await axios.delete('http://localhost:4002/api/user/delete/'+id,{ withCredentials: true })
        if(Confirm.data.deleted){
            dispatch({type:userConstants.clearUser,payload:{}})
            dispatch({type:authConstants.logout,payload:false}) 
            history.push('/')
        }else{
            alert('user not deleted')
        }
    }catch(err){
        console.log(err)
    }    
}

const deleteTodo =(id) =>async (dispatch)=>{
    try{
        const Confirm = await axios.delete('http://localhost:4002/api/delete/'+id,{ withCredentials: true })
        if(Confirm.data.deleted){
            dispatch({type:userConstants.setUser,payload:Confirm.data.user})
         
            history.push('/')
        }else{
            alert('todo not deleted')
        }
    }catch(err){
        console.log(err)
    }

}

const organizeTodos = (method,direction) =>async (dispatch)=>{
    try{
        const {data} = await axios.get(`http://localhost:4002/api/todos/${method}/${direction||1}`,{ withCredentials: true })
        
        dispatch({type:userConstants.setTodos,payload:data})
    }catch(err){
        console.log(err)
    }
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