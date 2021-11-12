import React, { Fragment }  from 'react' 
import { Link } from 'react-router-dom'
import {authActions} from '../../../actions/authActions'
import { connect } from 'react-redux';

 function Nav(props) {
    const {setShowAccount,showAccount}=props
    const navBarContent = () => {
        if(props.auth){
         return(
             <Fragment>
            <li className="nav-link">
                <button className="nav-top-button" onClick={()=>{
                   setShowAccount(!showAccount)
                }}>{props.user.name}</button>
            </li>
            <li className="nav-link">
                <button className="nav-top-button" onClick={logout}>logout?</button>
            </li>
            </Fragment>
         )        
        }else{
            return(
                <Link className="navbar-brand navbar-text" to="/">TODO</Link>
            )
        }
    }

    const logout = () => {
       props.logout()
    }
    
    return (
        <nav className="justify-content-end navbar navbar-light navbar-custom">
            {navBarContent()}
         
        </nav>
    )
}

function mapPropsToState(state){
    return{
        auth:state.auth,
        user:state.user
    }
}
const actionCreators={
    logout:authActions.logout
} 

export default connect(mapPropsToState,actionCreators)(Nav)