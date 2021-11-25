import React, { Fragment }  from 'react' 
import { Link } from 'react-router-dom'
import {authActions} from '../../../actions/authActions'
import { connect } from 'react-redux';
import { modalActions } from '../../../actions/modalActions';


 function Nav(props) {
    const {setShowAccount,showAccount}=props
    const navBarContent = () => {
        if(props.auth){
         return(
             <Fragment>
            <li className="nav-link">
                <button className="nav-top-button " onClick={()=>{
                   setShowAccount(!showAccount)
                   props.setShowEdit(false)
                   props.setShowCreate(false)
                   
                }}>{props.user.name}</button>
            </li>
            <li className="nav-link">
                <button className="nav-top-button" onClick={logout}>logout?</button>
            </li>
            </Fragment>
         )        
        }else{
            return(
                <li className="nav-link">
                    <Link className="nav-top-button" to="/">TODO</Link>

                </li>
                
            )
        }
    }

    const logout = () => {
       props.logout()
    }
    
    return (
        <nav className="justify-content-end navbar  fixed-top  navbar-light navbar-custom">
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
    logout:authActions.logout,
    setPage:modalActions.setPage
} 

export default connect(mapPropsToState,actionCreators)(Nav)