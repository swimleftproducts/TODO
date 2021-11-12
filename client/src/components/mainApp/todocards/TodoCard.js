import React from 'react'
import { connect } from 'react-redux';

import ProgressBar from './ProgressBar.js'
import {userActions} from '../../../actions/userActions'

function TodoCard(props) {
    // eslint-disable-next-line no-unused-vars
   
    // eslint-disable-next-line no-unused-vars
    let {_id,title,type,numberSteps,completeSteps,imageUrl,completed,details}=props.config
   
    
    
    const editTodo =() => {
        console.log('triggered edit')
        props.setShowEdit({id:_id})
    }
    return (
       <div className={` nb-todo-card  `} onClick={(e)=>{
          props.setDetailId(_id)           
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
                <div onClick={(e) => {
                    e.stopPropagation()
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
                }}
                >
                    <i className="bi todo-icon bi-caret-right-fill"></i>
                </div>
            </div>
        </div>
       </div>
    )
}
function mapPropsToState(state){
    return{
        todos:state.user.todos||[]
    }
}
const actionCreators={
    changeProgress:userActions.changeProgress
} 
export default connect(mapPropsToState,actionCreators)(TodoCard)