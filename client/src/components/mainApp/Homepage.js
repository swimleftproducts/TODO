import React, {useEffect,useState} from 'react'
import {authActions} from '../../actions/authActions'
import { connect } from 'react-redux';

import NavTop from './nav/NavTop'
import NavBottom from './nav/NavBottom';

import CreateNew from './CreateOrModifyCard/CreateNew';
import EditTodo from './CreateOrModifyCard/EditTodo';
import TodoCardDashboard from './todocards/TodoCardDashboard';
import EditAccount from './editAccount/EditAccount';

function Homepage(props) {
    const [showCreate,setShowCreate]= useState(false)
    const [showEdit,setShowEdit]= useState({})
    const [showAccount,setShowAccount] =useState(false)

   
    

    const renderContents= ()=>{
        if(showCreate){
            return <CreateNew setShowCreate={setShowCreate}/>
        }else if(showEdit.id){
            return <EditTodo showEdit={showEdit} setShowEdit={setShowEdit}/>
        }else if(showAccount){
            return <EditAccount/>
        }
        else{
            return(
                <TodoCardDashboard setShowEdit={setShowEdit}/>               
            )
        }
    }
    
    return (
        <div id="mainArea" className="general-background mx-0 my-0 "
        onClick={(e) => {
          if(e.target.id==="mainArea"){
              setShowEdit(false)
              setShowCreate(false)
          }
        }}>
            <NavTop setShowAccount={setShowAccount} showAccount={showAccount}/>
           
            <div className="container-fluid  row mx-0 my-3 p-0">
                <div className="row justify-content-center my-0 mx-0 p-0">
                 {renderContents()} 
                </div>
            </div>
            <NavBottom setShowCreate={setShowCreate} showCreate={showCreate}/>
        </div>
   
    )
}
function mapPropsToState(state){
    return{
        auth:state.auth,
        user:state.user
    }
}
const actionCreators={
    logout:authActions.login,
    isAuthenticated:authActions.isAuthenticated
} 

export default connect(mapPropsToState,actionCreators)(Homepage)