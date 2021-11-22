import React from 'react'
import CreateNewForm from './CreateNewForm'
import { connect } from 'react-redux'

function CreateNew(props) {
    
    return (
        
    <div className={`sign-in-block ${props.modal?"edit-account-block-modal":null}`}>
        <div className="mx-auto ">       
            <CreateNewForm setShowCreate={props.setShowCreate}/>
        </div>
     </div>     
   
    )
}
const mapStateToProps = (state) => ({
   
    modal:state.modal.show
})

const mapDispatchToProps = {    

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNew)










   