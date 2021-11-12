import React from 'react'
import { connect } from 'react-redux'

import EditAccountForm from './EditAccountForm'
import { userActions } from '../../../actions/userActions'


export const EditAccount = (props) => {
    
    return (
        <div className="edit-account-block" >
            <div className=" ">
                <EditAccountForm editUser={props.editUser} deleteUser={props.deleteUser} user={props.user}/>  
                    <hr></hr>
                <div className="text-center m-4">
                    <button type="" onClick={() => {
                    props.deleteUser(props.user._id)
                    }} className="btn text-align-center delete-btn btn-danger  m-4 mb-2 mt-1">delete your account!</button>
                </div>
            </div>
        </div>     
    )
}

const mapStateToProps = (state) => ({
       user:state.user
})

const mapDispatchToProps = {    
    deleteUser:userActions.deleteUser,
    editUser:userActions.editUser
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount)
