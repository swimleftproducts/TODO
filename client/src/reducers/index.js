import { combineReducers } from "redux";
import {authConstants} from "../constants/authConstants";
import {userConstants} from "../constants/userConstants"
import {modalConstants} from '../constants/modalConstants'
import {errorConstants} from '../constants/errorConstants'
import {reducerHelpers} from '../reducers/reducerHelpers'

const authReducer =(state=false,action)=>{
   switch(action.type){
    case authConstants.login:
        return action.payload
    case authConstants.logout:
         return false
    case authConstants.deleteUser:
        return false
    default:
        return state
   }
}
const userReducer = (state={},action)=>{
    switch(action.type){
        case userConstants.setUser:
            return action.payload
        case userConstants.clearUser:
            return {}
        case userConstants.editTodo:
            const newEditTodos = state.todos.map((element) => {
                if(element._id===action.payload._id){
                    return action.payload
                }else{return element}
            })
            return {...state,todos:newEditTodos}
        case userConstants.setTodos:
            return  {...state, todos:action.payload}
        case userConstants.addTodo:
            return {...state,todos:[...state.todos,action.payload]}
        case userConstants.changeProgress:  
            let newState={}       
            const newTodos= state.todos.map((todo) => {
                const {direction,id}=action.payload
                if(todo._id===id){
                    if(todo.completeSteps===0 && direction===0){
                    }else if(todo.completeSteps===todo.numberSteps && direction===1){                        
                    }else{
                      if(direction){
                          todo.completeSteps=todo.completeSteps+1
                          if(todo.completeSteps===todo.numberSteps){
                              todo.completed=true
                          }
                      }else{
                          todo.completeSteps=todo.completeSteps-1
                          todo.completed=false
                      }                        
                    }
                }
                return todo
            })
            
            newState= {...state,todos:newTodos}
            return newState
        default:
            return state
    }
}

const modalReducer= (state={show:false,page:"landing"},action)=>{
    switch(action.type){
        case modalConstants.toggleModal:
            return {...state,show:!state.show}
        case modalConstants.setModalPage:
            return{...state, page:action.payload}
        default:
            return state
    }
}

const errorFormat ={
    code:null,
    message:"init",
    errors:{
        description:null,
        internalErrorCode:null
    }
}

const errorReducer= (state={isLoading:false,exists:false,errorDetails:errorFormat},action)=>{
    
    switch (action.type) {
        case errorConstants.error:
            return{
                ...reducerHelpers.errors(state,action),
                isLoading:false
            }
        case errorConstants.clearError:
            return{
                ...state,
                exists:false
            }
        case errorConstants.isLoading:
            return{
                ...state,isLoading:true
            }
        case errorConstants.isDoneLoading:
            return{
                 ...state,isLoading:false
            }

        default:
           return {...state}
    }
}


const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    modal:modalReducer,
    error:errorReducer
})

export default rootReducer