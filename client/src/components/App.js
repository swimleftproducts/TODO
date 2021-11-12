import React, {useEffect}  from 'react';
import {Router, Route,Redirect} from 'react-router-dom'

import {connect} from 'react-redux'

import history from '../history'
import LandingPage from './LandingPage'
import Login from './authentication/Login'
import Register from './authentication/Register';
import Homepage from './mainApp/Homepage'
import ProtectedRoute from './higherOrder/ProtectedRoute';
import {authActions} from '../actions'
import {modalActions} from '../actions/modalActions'

import Modal from '../components/behindscenes/Modal'



const App =  (props) => {
   

    useEffect(() => {
        props.isAuthenticated()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div style={{"height":"100%","width": "100%"}}>
        <div className={`under-the-hood ${props.modal?"under-the-hood-light":null}`} style={{"backgroundColor":"rgb(158, 177, 221)"}} onClick={() => {
          props.toggleModal()
        }}>
         { props.modal?"click back to app": "behind the scenes"}
        </div>
        {props.modal?<Modal/>:null}
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
    toggleModal:modalActions.toggleModal
}
function mapPropsToState(state){
    return{
      auth:state.auth,
      modal:state.modal
    }
}
export default connect(mapPropsToState,actionCreators)(App)