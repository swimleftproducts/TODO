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