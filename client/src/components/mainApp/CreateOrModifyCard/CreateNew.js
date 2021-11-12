import React from 'react'
import CreateNewForm from './CreateNewForm'


export default function CreateNew(props) {
    
    return (
        
    <div className="sign-in-block">
        <div className="mx-auto ">       
            <CreateNewForm setShowCreate={props.setShowCreate}/>
        </div>
     </div>     
   
    )
}









   