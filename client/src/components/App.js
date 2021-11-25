import React, {useEffect}  from 'react';
import {Router, Route,Redirect} from 'react-router-dom'

import {connect} from 'react-redux'

import history from '../history'
import LandingPage from './LandingPage'
import Login from './authentication/Login'
import Register from './authentication/Register';
import Homepage from './mainApp/Homepage'
import Error from './errorHandling/Error'
import Loading from './Loading'
import ProtectedRoute from './higherOrder/ProtectedRoute';
import {authActions} from '../actions'
import {modalActions} from '../actions/modalActions'

import Modal from '../components/behindscenes/Modal'
import { modalConstants } from '../constants/modalConstants';



const App =  (props) => {
   
   const {error}= props

    useEffect(() => {
      
       if(window.location.href.indexOf("register")>0){
        props.setPage(modalConstants.pages.register)
       }else if(window.location.href.indexOf("login")>0){
        props.setPage(modalConstants.pages.signin)
      }else{
        props.setPage(modalConstants.pages.landing)
       }
        props.isAuthenticated()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div style={{"height":"100%","width": "100%"}}>
        <div className={`under-the-hood ${props.modal?"under-the-hood-light":null}`} style={{"backgroundColor":"rgb(158, 177, 221)"}} onClick={() => {
          props.toggleModal()
        }}>
         { props.modal.show?"click back to app   ": "behind the scenes    "}
 
         <i class="bi bi-lightbulb-fill modal-icon modal-icon-new blink_me"></i>
        </div>
        {props.modal.show?<Modal/>:null}
        {error.exists?<Error />:null}
        {error.isLoading?<Loading/>:null}
        <Router history={history}>
              <div style={{"height":"100%","width": "100%"}}>     
                  <Route path="/" exact >
                    {props.auth?   <Redirect to={{pathname:'/homepage'}}/>:<LandingPage/>}
                  </Route>
                  <Route path="/login" exact component={Login}/>
                 <ProtectedRoute
                    exact
                    path="/homepage"
                    component={Homepage}
                  />
                  <Route path="/register" exact component=
                  {Register}/>
              </div>
          </Router> 
      </div>
    )
}

const actionCreators ={
    isAuthenticated:authActions.isAuthenticated,
    toggleModal:modalActions.toggleModal,
    setPage:modalActions.setPage
}
function mapPropsToState(state){
    return{
      auth:state.auth,
      modal:state.modal,
      error:state.error
    }
}
export default connect(mapPropsToState,actionCreators)(App)