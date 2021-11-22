/* eslint-disable no-unused-vars */
import React,{useEffect} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { connect } from 'react-redux';

import TextError from '../../authentication/TextError';
import { modalConstants } from '../../../constants/modalConstants';
import { modalActions } from '../../../actions/modalActions'

function EditAccountForm(props) {
    const {setPage,editUser,deleteUser,user}=props
   

    useEffect(() => {
      setPage(modalConstants.pages.editUser)
      return (() => {
        setPage(modalConstants.pages.homepage)
      })
    },[setPage])
    
    return (
        <Formik
        initialValues={{ name:user.name,email:"",emailConf:"", password:"",passwordConf:""}}
        validationSchema={Yup.object({
          name: Yup.string()
              .max(15,'must be 15 charcters or less'),
          email: Yup.string(),
          emailConf: Yup.string()
            .when('email',(email,passSchema) => {
              return  email? passSchema.required('please confirm').oneOf([Yup.ref('email'),null],"emails do not match"):passSchema
            }),
          password: Yup.string()
                .min(1,'6 or more'),
          passwordConf: Yup.string()
           .oneOf([Yup.ref('password'),null],"passwords do not match"),
        })}
        onSubmit={(values, { setSubmitting }) => {
         setSubmitting(false);
         editUser(values,user._id)
        }}
      >
        <Form className='m-4'>
            <h3 className="text-align-center">make changes as needed</h3>
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
                <Field  className="input-field" name="emailConf" type="text" />
                <div className="container-fluid p-0 m-0 row justify-content-between">
                    <label className="sign-in-text p-0 col-5"  htmlFor="emailConf">email confirm</label>
                    <ErrorMessage component={TextError} name="emailConf" />
                </div>  
                
            </div>    
            <div className="mb-3">
                <Field  className="input-field" name="password" type="text" />
                <div className="container-fluid p-0 m-0 row justify-content-between">
                    <label className="sign-in-text p-0 col-5"  htmlFor="password">password</label>
                    <ErrorMessage component={TextError} name="password" />
                </div>   
            </div>
  
            <div className="mb-3">
                <Field  className="input-field" name="passwordConf" type="text" />
                <div className="container-fluid p-0 m-0 row justify-content-between">
                    <label className="sign-in-text p-0 col-5"  htmlFor="passwordConf">password confirm</label>
                    <ErrorMessage component={TextError} name="passwordConf" />
                </div>   
            </div>
         
          <div className="text-center">
              <button type="submit" className="submit-btn btn btn-primary">update account</button>
          </div>
          
          
        </Form>
        
        
      </Formik>
    )
}

function mapPropsToState(state){
  return{}
}
const actionCreators={
  setPage:modalActions.setPage
} 
export default connect(mapPropsToState,actionCreators)(EditAccountForm)