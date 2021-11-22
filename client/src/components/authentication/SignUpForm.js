import React,{useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import {authActions} from '../../actions'
import { Link } from 'react-router-dom'
import TextError from './TextError';

import { modalConstants } from '../../constants/modalConstants';
import { modalActions } from '../../actions/modalActions';


const SignupForm = (props) => {

  const {setPage} = props

  useEffect((params) => {
    setPage(modalConstants.pages.register)
    return (() => {
      setPage(modalConstants.pages.landing)
  })    
  },[setPage])


  return (
    <Formik
      initialValues={{ name:"", email: '',password:"" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, 'must be 15 characters or less')
          .required('required'),
        email: Yup.string().email('invalid email address').required('required'),
        password:Yup.string().required("password please")
      })}
      onSubmit={(values, { setSubmitting }) => {
            
        setSubmitting(false);
        props.register(values)
        
       
      }}
    >
      <Form className='m-4'>
        <div className="mb-3">
            <Field  className="input-field" name="name" type="text" />
            <div className="container-fluid p-0 m-0 row justify-content-between">
                <label className="sign-in-text p-0 col-3"  htmlFor="name">name</label>
                <ErrorMessage component={TextError} name="name" />
            </div>  
            
        </div>
        <div className="mb-3">
             <Field  className="input-field" name="email" type="text" />
             <div className="container-fluid p-0 m-0 row justify-content-between">
                <label className="sign-in-text p-0 col-3"  htmlFor="email">email</label>
                <ErrorMessage component={TextError} name="email" />
            </div>  
          
        </div>

        <div className="mb-3">
             <Field  className="input-field" name="password" type="text" />
             <div className="container-fluid p-0 m-0 row justify-content-between">
                <label className="sign-in-text p-0 col-3"  htmlFor="password">password</label>
                <ErrorMessage component={TextError} name="password" />
            </div>  
        </div>

       
        <div className="text-center">
            <button type="submit" className="submit-btn btn btn-primary">start doing</button>
        </div>
        <hr></hr>
        <div className=" text-center ">
            <Link to="/login"
            className="mt-0 register-btn btn btn-primary">have an account?</Link>
        </div>
        
      </Form>
     
    </Formik>
  );
};

function mapPropsToState(state){
    return{auth:state.auth}
}
const actionCreators={
    register:authActions.register,
    setPage:modalActions.setPage 
} 

export default connect(mapPropsToState,actionCreators)(SignupForm)