import React,{useState, useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import {userActions} from '../../../actions/userActions'

import TextError from '../../authentication/TextError';

import { modalConstants } from '../../../constants/modalConstants';
import { modalActions } from '../../../actions/modalActions';

import { errorActions } from "../../../actions/errorActions";

const CreateNewForm= (props) => {
 const [file,setFile]= useState()

 const onFileChange = (e)=>{
  setFile(e.target.files[0])
 }

 const {setPage} = props

 useEffect(() => {
  setPage(modalConstants.pages.create)
  return (() => {
      setPage(modalConstants.pages.homepage)
})    
},[setPage])

  return (
    <Formik
      initialValues={{ title:"",type:"",numberSteps:"", details:"",imageFile:""}}
      validationSchema={Yup.object({
        title: Yup.string()
            .max(25,'must be 25 charcters or less')
            .required('required'),  
        type: Yup.string()
            .max(15, 'must be 15 characters or less')
            .required('required'),
        numberSteps: Yup.number()
              .max(5,'5 or less')
              .min(1,"at least 1 step")
              .required('required'),
        details: Yup.string()
            
      })}
      onSubmit={async  (values, { setSubmitting }) => {
        setSubmitting(false);
        props.createTodo(values,null,props.setShowCreate,file)
      }}
    >
      <Form className='m-4'>
        <div className="mb-3">
            <Field  className="input-field" name="title" type="text" />
            <div className="container-fluid p-0 m-0 row justify-content-between">
                <label className="sign-in-text p-0 col-3"  htmlFor="title">title</label>
                <ErrorMessage component={TextError} name="title" />
            </div>  
            
        </div>
        <div className="mb-3">
             <Field  className="input-field" name="type" type="text" />
             <div className="container-fluid p-0 m-0 row justify-content-between">
                <label className="sign-in-text p-0 col-3"  htmlFor="type">type</label>
                <ErrorMessage component={TextError} name="type" />
            </div>  
          
        </div>

        <div className="mb-3">
             <Field  className="input-field" name="numberSteps" type="text" />
             <div className="container-fluid p-0 m-0 row justify-content-between">
                <label className="sign-in-text p-0 col-5"  htmlFor="numberSteps"># of steps</label>
                <ErrorMessage component={TextError} name="numberSteps" />
            </div>  
          
        </div>
        <div className="mb-3">
             <input  className="image-upload input-field" name="imageFile" type="file" accept="image/*" 
              onChange={
                (e)=>{onFileChange(e)}
              }/>
             <div className="container-fluid p-0 m-0 row justify-content-between">
                <label className="sign-in-text p-0 col-5"  htmlFor="file">image file</label>
                <ErrorMessage component={TextError} name="imageFile" />
            </div>    
        </div>




       

        <div className="mb-3 ">
             <Field  className="create-new-textarea input-field" name="details" type="textarea" as="textarea" />
             <div className="container-fluid p-0 m-0 row justify-content-between">
                <label className="sign-in-text p-0 col-3"  htmlFor="details">details</label>
                <ErrorMessage component={TextError} name="details" />
            </div>  
        </div>

       
        <div className="text-center">
            <button type="submit" className="submit-btn btn btn-primary">add more on your plate</button>
        </div>
        
      </Form>
    </Formik>
  );
};

function mapPropsToState(state){
    return{}
}
const actionCreators={
    createTodo:userActions.createTodo,
    setPage:modalActions.setPage, 
    errorAction: errorActions.errorActionCreator

} 

export default connect(mapPropsToState,actionCreators)(CreateNewForm)