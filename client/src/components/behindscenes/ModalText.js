import React,{useState} from 'react'
import {connect} from 'react-redux'
import {behindScenes} from '../behindscenes/content'
import {modalConstants} from '../../constants/modalConstants'


function ModalText(props) {

    const [introModal,setIntroModal]= useState(1)
    const {general,backEnd,frontEnd}= modalConstants.menu
    
    const {activeMenu}=props
    
    function renderText(){
       let {page} = props
        if(!page){
            page=modalConstants.pages.landing
        }
        
        const setHeaders = ()=>{
            let headers=[]
            if(activeMenu===general){
                headers[0]="Design Decisions"
                headers[1]="Functionality"
                headers[2]="Future Improvements"
            }else if(activeMenu===frontEnd){
                headers[0]="General Component Hierarchy"
                headers[1]="Redux and Other Notes"
                headers[2]="Future Improvements"
            }else if(activeMenu===backEnd){
                headers[0]="API Calls"
                headers[1]="Database Notes"
                headers[2]="Future Improvements"
            }
            return headers
        }

        let intro
        const setContent = ()=>{
            let content=[]            
            if(activeMenu===general){
                intro=<p style={{"textAlign": "center"}}>Learn about: <em> {page.toLowerCase()}</em> </p>
                content[0]=behindScenes[page][activeMenu][0]
                content[1]=behindScenes[page][activeMenu][1]
                content[2]=behindScenes[page][activeMenu][2]
            }else if(activeMenu===frontEnd){
                content[0]=behindScenes[page][activeMenu][0]
                content[1]=behindScenes[page][activeMenu][1]
                content[2]=behindScenes[page][activeMenu][2]
            }else if(activeMenu===backEnd){
                content[0]=behindScenes[page][activeMenu][0]
                content[1]=behindScenes[page][activeMenu][1]
                content[2]=behindScenes[page][activeMenu][2]
            }
            return content
        }

        const content = setContent()
       
        const headers=setHeaders()

        function renderIntro(){
           
            if(introModal){return(
                <div onClick={(event) => {
                    event.stopPropagation()
                    setIntroModal(2)
                }}
                className="intro-modal p-2">
                    <h4>
                        Hello.
                    </h4>
                    <h5>
                        Thank you for viewing this webapp.
                    </h5>
                    <hr></hr>
                    <p  style={{ "fontSize": ".8rem"}}>
                        Throughout the site, the <span style={{"fontStyle": "italic"}}>behind the scenes</span> menu provides insight into the how and why. 
                     </p>  
                     <p  style={{ "fontSize": ".8rem"}}> 
                       A website feature/page is listed at the top of the general tab. The info in the menu refers to this feature/page. Enjoy!
                    </p>
                    <p  style={{ "fontSize": ".8rem"}}>
                        -Eric
                    </p>
                    <p  style={{"backgroundColor":"white","transform":"translate(0px,-10px)","fontSize":".8rem", "textAlign":"center","fontStyle": "italic","height":"45px","lineHeight":"45px"}}>
                        <span  >click for overview</span>
                    </p>
                </div>
            )}
        }

        function renderIntro2(){
            
            if(introModal){return(
                <div onClick={(event) => {
                    event.stopPropagation()
                    setIntroModal(0)
                }}
                className="intro-modal p-2">
                    <h4>
                        Overview
                    </h4>
                   <p style={{ "fontSize": ".8rem"}}>
                   A mockup of the site and backend design is found at <a target='blank' href='https://www.figma.com/file/v1xS2diPQ2GG9csYFl87Ti/Untitled?node-id=0%3A1'>figma</a>. 
                   </p>
                   <p style={{ "fontSize": ".8rem"}}>TODO is based on the insight that images are more memorable and complex than words. This todo application primarily uses images to represent todos.
                    </p>
                    <p style={{ "fontSize": ".8rem"}}>
                   A TODO user can create, edit, progress through, sort and delete a list of todos.
                   </p>
                    <hr></hr>
                    
                    <p  style={{"backgroundColor":"white","transform":"translate(0px,-8px)","height":"50px","lineHeight":"50px","fontSize":".8rem", "textAlign":"center","fontStyle": "italic"}}>
                        <span  >click to close</span>
                    </p>
                </div>
            )}
        }
        function showDatabaseInfo(){
            if(typeof content[1]==='object'){
              return <pre style={{ "fontSize": ".5rem"}}>{JSON.stringify(content[1],null,1)}</pre>
            }else{
               return( 
                <p style={{ "fontSize": ".8rem"}}>
                 {content[1]}
                </p>
                )

            }
            
          
        }
        
        return (
            <div>
                
                {(page===modalConstants.pages.landing&&introModal===1)?renderIntro():null}
                {(page===modalConstants.pages.landing&&introModal===2)?renderIntro2():null}

               {intro}
               
                <h6 style={{ "fontWeight": "bold"}}>
                    {headers[0]}
                </h6>
                <p style={{ "fontSize": ".8rem"}} dangerouslySetInnerHTML={{__html:content[0]}}/>
                                  
                <h6 style={{ "fontWeight": "bold"}}>
                {headers[1]} 
                </h6>

                {showDatabaseInfo()}
                

                <h6 style={{ "fontStyle": "italic"}}>
                {headers[2]} 
                </h6>
                <p style={{ "fontSize": ".8rem"}}>
                    {content[2]}
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