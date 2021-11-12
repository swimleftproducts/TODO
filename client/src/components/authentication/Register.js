import React from 'react';


import Nav from '../mainApp/nav/NavTop'
import SignUpForm from './SignUpForm'

const Register = () => {
  return (
    <div className="general-background"  style={{"height":"100%"}}>
    <Nav/>
        <div className="sign-in-block">
            <div className="mx-auto ">       
                <SignUpForm/>
            </div>
        </div>
    </div>
  
    )
  
  
};
export default Register