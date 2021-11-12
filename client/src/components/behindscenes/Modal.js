import React from 'react'
import {modalActions} from '../../actions/modalActions'

import {connect} from 'react-redux'

function Modal(props) {
    return (
    <div className="todo-modal"  onClick={props.toggleModal}>
        <div className="modal-content">
            
        </div>
    </div>
    )
}
const actionCreators ={
    toggleModal:modalActions.toggleModal
}
function mapPropsToState(state){
    return{}
}

export default connect(mapPropsToState,actionCreators)(Modal)