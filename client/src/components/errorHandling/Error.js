import React from 'react'
import { connect } from 'react-redux'
import {errorActions} from '../../actions/errorActions'

export const Error = (props) => {
    const{ error,clearError} = props
    
    const clickHandler =(e)=>{
        e.stopPropagation()
        clearError()
    }
    return (
        <div className="error-modal">
            ugh oh : {error.errorDetails.message}
            <i onClick={clickHandler} className="bi error-icon bi-x-circle"></i>
        </div>
    )
}

const mapStateToProps = (state) => ({
    error:state.error
})

const mapDispatchToProps = {
    clearError : errorActions.errorClearAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Error)
