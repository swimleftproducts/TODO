import React, {useState} from 'react'
import Nav from '../mainApp/nav/NavTop'

import { connect } from 'react-redux';
import {authActions} from '../../actions'
import { Link } from 'react-router-dom'

// import reactElementToJSXString from 'react-element-to-jsx-string';


 function Login(props) {
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
   


    const onSubmit = async (event) => {
      props.login({email:email,password:password})    
    }
    
//    const all = (<div className="mb-3">
                      
//    <input onChange={(e) => {
//    setPassword(e.target.value)    
//    }} type="password" name="password" className="form-control" id="password" value={password}/>

//    <label htmlFor="password" className="sign-in-text">password</label>
// </div>)
   
//     console.log("showing some jsx", reactElementToJSXString(all,{showFunctions:true}))

    return (
        <div className="general-background" style={{"height":"100%"}}>
            <Nav/>
            <div className="sign-in-block">
            <div className="mx-auto ">       
                <form action="" method="" className="p-4">
                     <div className="mb-3">
                        
                        <input onChange={(e) => {
                        setEmail(e.target.value)    
                        }} type="email" name="email" className="form-control" id="email" value={email} />

                        <label htmlFor="email" className="  sign-in-text">email</label>
                        
                    </div>
                    <div className="mb-3">
                      
                        <input onChange={(e) => {
                        setPassword(e.target.value)    
                        }} type="password" name="password" className="form-control" id="password" value={password}/>

                        <label htmlFor="password" className="sign-in-text">password</label>
                    </div>

                    <div className=" text-center ">
                         <button type="submit" onClick={(e) => {
                              e.preventDefault()
                          onSubmit(e);
                         }}className="submit-btn btn btn-primary">start doing</button>
                    </div>
                    <hr></hr>
                    <div className=" text-center ">
                     <Link to="/register"
                      className=" register-btn btn btn-primary">need to register?</Link>
                    </div>
                   
                
                 
                </form>
                
            </div>
        </div>
        </div>
    )
}

function mapPropsToState(state){
    return{auth:state.auth}
}
const actionCreators={
    login:authActions.login
} 

export default connect(mapPropsToState,actionCreators)(Login)

