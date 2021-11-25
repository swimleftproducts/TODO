import React, {useEffect,useState} from 'react'
import {authActions} from '../../actions/authActions'
import { connect } from 'react-redux';

import NavTop from './nav/NavTop'
import NavBottom from './nav/NavBottom';

import CreateNew from './CreateOrModifyCard/CreateNew';
import EditTodo from './CreateOrModifyCard/EditTodo';
import TodoCardDashboard from './todocards/TodoCardDashboard';
import EditAccount from './editAccount/EditAccount';
    
import { modalConstants } from '../../constants/modalConstants';
import { modalActions } from '../../actions/modalActions';

function Homepage(props) {
    const [showCreate,setShowCreate]= useState(false)
    const [showEdit,setShowEdit]= useState({})
    const [showAccount,setShowAccount] =useState(false)
    const {setPage} = props

    useEffect(() => {
        setPage(modalConstants.pages.homepage)
        return (() => {
            setPage(modalConstants.pages.landing)
      })    
    },[setPage])

    

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
        <div id="mainArea" className="homepage-background mx-0 my-0 main-padding-top "
        onClick={(e) => {
          if(e.target.id==="mainArea"){
              setShowEdit(false)
              setShowCreate(false)
              setShowAccount(false)
          }
        }}>
            <NavTop setShowAccount={setShowAccount} showAccount={showAccount} setShowEdit={setShowEdit} setShowCreate={setShowCreate}/>
           
            <div className="container-fluid mx-0 my-3 p-0  ">
                <div className="row justify-content-center my-0 mx-0 p-0 ">
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
    isAuthenticated:authActions.isAuthenticated,
    setPage:modalActions.setPage 
} 

export default connect(mapPropsToState,actionCreators)(Homepage)