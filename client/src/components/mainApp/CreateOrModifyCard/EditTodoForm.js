/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect,useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'

import { connect } from 'react-redux';
import {userActions} from '../../../actions/userActions'

import TextError from '../../authentication/TextError';
import { modalConstants } from '../../../constants/modalConstants';
import { modalActions } from '../../../actions/modalActions';


const EditTodoForm= (props) => {
    const [todo, setTodo] = useState({})
    const [file,setFile]= useState()

    const onFileChange = (e)=>{
     setFile(e.target.files[0])
    }

    const {setPage} = props

    useEffect((params) => {
        const id=props.id
        const todos=props.todos;
        
        todos.forEach((element) => {
         
            if(element._id===id){
             // eslint-disable-next-line react-hooks/exhaustive-deps
              let title=element.title 
              let type=element.type 
              let numberSteps=element.numberSteps 
              let details=element.details 
              let image=element.imageUrl
              let completeSteps=element.completeSteps
            setTodo({title,type,numberSteps,completeSteps,details,image,id:element._id})
            }
        })

       

        setPage(modalConstants.pages.editTodo)
        return (() => {
          setPage(modalConstants.pages.homepage)
        })    
        
    },[setPage])

   
    return (
       todo?
      <Formik
        enableReinitialize={ true}
        initialValues={{ title:todo.title,type:todo.type,numberSteps:todo.numberSteps, details:todo.details,image:todo.image}}

        validationSchema={Yup.object({
          title: Yup.string()
              .max(25,'must be 25 charcters or less'),
          type: Yup.string()
              .max(15, 'must be 15 characters or less'),           
          numberSteps: Yup.number()
                .min(todo.completeSteps,"cannot be less than done")
                .max(5,`max 5`),
          details: Yup.string()    
        })}
        onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);  
            props.editTodo(values,todo.id,props.setShowEdit,file)
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
                <label className="sign-in-text p-0 col-5"  htmlFor="imageFile">image file</label>
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
              <button type="submit" className="submit-btn btn btn-primary">update todo</button>
          </div>
          
          
        </Form>
        
      </Formik>: <span>Loading</span>
    );
  };
  
  function mapPropsToState(state){
      return{
          todos:state.user.todos
      }
  }
  const actionCreators={
    setPage:modalActions.setPage ,
    editTodo:userActions.editTodo,
      
  } 
  
  export default connect(mapPropsToState,actionCreators)(EditTodoForm)