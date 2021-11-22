import React from 'react'
import {connect} from 'react-redux'
import {behindScenes} from '../behindscenes/content'
import {modalConstants} from '../../constants/modalConstants'


function ModalText(props) {
    const {general,backEnd,frontEnd}= modalConstants.menu
    
    const {activeMenu}=props
    
    function renderText(){
        const {page} = props
        
        const setHeaders = ()=>{
            let headers=[]
            if(activeMenu===general){
                headers[0]="Design Decisions"
                headers[1]="Functionality"
            }else if(activeMenu===frontEnd){
                headers[0]="General Component Hierarcy"
                headers[1]="Redux and Other Notes"
            }else if(activeMenu===backEnd){
                headers[0]="Api Calls"
                headers[1]="Database Notes"
            }
            return headers
        }
        const setContent = ()=>{
            let content=[]
            if(activeMenu===general){
                content[0]=behindScenes[page][activeMenu][0]
                content[1]=behindScenes[page][activeMenu][1]
            }else if(activeMenu===frontEnd){
                content[0]=behindScenes[page][activeMenu][0]
                content[1]=behindScenes[page][activeMenu][1]
            }else if(activeMenu===backEnd){
                content[0]=behindScenes[page][activeMenu][0]
                content[1]=behindScenes[page][activeMenu][1]
            }
            return content
        }

        const content = setContent()
       
        const headers=setHeaders()


        
        
        return (
            <div>
                <p>info for <em> {props.page.toLowerCase()}</em> </p>
               
                <h6 style={{ "fontWeight": "bold"}}>
                    {headers[0]}
                </h6>
                <p>
                   {content[0]}
                </p>
                <h6 style={{ "fontWeight": "bold"}}>
                {headers[1]} 
                </h6>
                <p>
                    {content[1]}
                </p>
            </div>
        )
    }

    return (
        <div>
            {renderText()}
        </div>
    )
}

function mapPropsToState(state){
    return{page:state.modal.page}
}


export default connect(mapPropsToState,null)(ModalText)