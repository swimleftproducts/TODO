import { combineReducers } from "redux";
import {authConstants} from "../constants/authConstants";
import {userConstants} from "../constants/userConstants"
import {modalConstants} from '../constants/modalConstants'

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
            return {}
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

const modalReducer= (state=false,action)=>{
    switch(action.type){
        case modalConstants.toggleModal:
            return !state
        default:
            return state
    }
}



const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    modal:modalReducer
})

export default rootReducer