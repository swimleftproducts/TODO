import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router'


function ProtectedRoute({component:Component, ...rest}) {
   const {auth} = {...rest}
   
    return (
      <Route {...rest} render={
        (props) => {
           if(auth){
               
                return <Component {...props}/>
           }else{
               return (
               <Redirect to={{pathname:'/'}}/>
               )
           }
        }
    }/>
    )
}
function mapPropsToState(state){
    return{auth:state.auth}
}

export default connect(mapPropsToState,null)(ProtectedRoute)