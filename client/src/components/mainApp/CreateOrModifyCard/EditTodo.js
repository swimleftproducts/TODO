import React from 'react';

import { connect } from 'react-redux';
import {userActions} from '../../../actions/userActions'

import EditTodoForm from './EditTodoForm';


const EditTodo= (props) => {

  return (
    <div className={`sign-in-block ${props.modal?"edit-account-block-modal":null}`} >
        <div className="mx-auto ">
            <h3 className="text-align-center">make changes as needed</h3>
            <EditTodoForm id={props.showEdit.id} setShowEdit={props.setShowEdit} />
        </div>
        <hr></hr>
        <div className="text-center m-4">
            <button type="" onClick={() => {
            
            props.deleteTodo(props.showEdit.id,props.setShowEdit)
            }} className="btn text-align-center delete-btn btn-danger  m-4 mb-2 mt-1">delete this todo!</button>
        </div>
    </div>     
  );
};

function mapPropsToState(state){
    return{
        modal:state.modal.show
    }
}
const actionCreators={
    editTodo:userActions.editTodo,
    deleteTodo:userActions.deleteTodo
} 

export default connect(mapPropsToState,actionCreators)(EditTodo)