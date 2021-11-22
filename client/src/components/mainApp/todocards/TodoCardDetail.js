import React,{useEffect} from 'react'
import { connect } from 'react-redux';

import ProgressBar from './ProgressBar.js'
import TodoDetail from './TodoDetail.js'

import {userActions} from '../../../actions/userActions'
  
import { modalConstants } from '../../../constants/modalConstants';
import { modalActions } from '../../../actions/modalActions';


function TodoCardDetail(props) {
    // eslint-disable-next-line no-unused-vars
  
    // eslint-disable-next-line no-unused-vars
    let {_id,title,type,numberSteps,completeSteps,imageUrl,details,completed}=props.config
    const {setPage} = props

    
    useEffect(() => {
        setPage(modalConstants.pages.detail)
        return (() => {
            setPage(modalConstants.pages.homepage)
      })    
    },[setPage])
    
   
    const editTodo =() => {
        props.setShowEdit({id:_id})
    }
    return (
       <div className="  nb-todo-card-detail  " onClick={(e)=>{
          props.setDetailId(0)           
       }}>
           <i 
            onClick={editTodo}
            className="todo-icon-edit bi bi-gear">
            </i>
           
           <div className="card p-2" >
            <img className={`${completed?"todo-card-completed":""} card-img-top rounded-0`} src={`${imageUrl}`} alt=".."/>
            
            <div className="todo-card-info container-fluid  m-0 p-0 ">
                <ProgressBar numberSteps={numberSteps} completeSteps={completeSteps}/>
            </div>
            <div className="todo-card-title container-fluid  m-0 p-0 text-center row ">
                <div onClick={(e) => {e.stopPropagation()
                    props.changeProgress(0,_id)
                }} className='col-2 m-0 p-0 todo-progress-button' >
                    <i className="bi todo-icon bi-caret-left-fill"></i>  
                </div>
                <div className='col-8  todo-text-title m-0 p-0'>
                    <p>{title}</p>
                </div>
                <div className='col-2  m-0 p-0 todo-progress-button' 
                onClick={(e) => {
                    e.stopPropagation()
                    props.changeProgress(1,_id)
                }}>
                    <i className="bi todo-icon bi-caret-right-fill"></i>
                </div>
            </div>
            <TodoDetail type={type} details={details}/>
        </div>
       </div>
    )
}
function mapPropsToState(state){
    return{
        page:state.modal.page,
        todos:state.user.todos||[],
    }
}
const actionCreators={
    changeProgress:userActions.changeProgress,
    setPage:modalActions.setPage 
} 
export default connect(mapPropsToState,actionCreators)(TodoCardDetail)