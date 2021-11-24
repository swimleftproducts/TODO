import React from 'react';
import { connect } from 'react-redux';

import Nav from '../mainApp/nav/NavTop'
import SignUpForm from './SignUpForm'




const Register = (props) => {
   

  return (
    <div className={`general-background`}  style={{"height":"100%"}}>
    <Nav/>
        <div className={`sign-in-block ${props.modal?"edit-account-block-modal":null}`}>
            <div className="mx-auto ">       
                <SignUpForm/>
            </div>
        </div>
    </div>
  
    )
  
  
};

const mapStateToProps = (state) => ({
   
    modal:state.modal.show
})

const mapDispatchToProps = {    
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

