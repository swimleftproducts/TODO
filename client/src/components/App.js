import React, {useEffect,useState}  from 'react';
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
   const[remainingInfo,setRemainingInfo]=useState('') 

   const {error}= props
   const {show}=props.modal


    useEffect(() => {
      
       if(window.location.href.indexOf("register")>0){
        props.setPage(modalConstants.pages.register)
       }else if(window.location.href.indexOf("login")>0){
        props.setPage(modalConstants.pages.signin)
      }else if(window.location.href.indexOf("landing")>0){
        props.setPage(modalConstants.pages.landing)
       }
        props.isAuthenticated()
        
      // for transitioning in text after behind scenes slider expands 
      if(show){
        setTimeout(() => {
          const {visited}=props.modal
          const totalVisited = [...new Set(visited)]
          let remaining = `${totalVisited.length}/9 details read`   
          setRemainingInfo(
            <div className="hints-remaining">
              {remaining}
           </div>
         )
        },500)
      }else{
        setRemainingInfo("")
      }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[show])

    function alertNewEmployer(){
      const {showAlert}=props.modal
      if(showAlert){
        return("modal-icon-new blink_me")
      }else{
        return ("modal-icon-old")
      } 
    }
     
    return(
        <div style={{"height":"100%","width": "100%"}}>
        <div className={`under-the-hood ${props.modal.show?"under-the-hood-light":null}`}  onClick={() => {
          props.toggleModal(props.modal.page)
        }}>
          <div>
            { props.modal.show?`click back to app`: "behind the scenes    "}
          </div>
         
 
         <i className={`bi bi-lightbulb-fill modal-icon ${alertNewEmployer()}`}></i>
         {remainingInfo}
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