import React, {useState} from 'react'
import {modalActions} from '../../actions/modalActions'

import {connect} from 'react-redux'
import ModalText from './ModalText'
import {modalConstants} from '../../constants/modalConstants'

function Modal(props) {
    const {general,frontEnd,backEnd}=modalConstants.menu

    const [activeMenu,setActiveMenu] = useState(general)
    const [activeMenuClass,setActiveMenuClass]=useState("modal-general")
   

    function clickHandler(e,menu){
        e.stopPropagation()
        switch (menu) {
            case general:
                setActiveMenu(general)
                setActiveMenuClass("modal-general")
            break;
            case frontEnd:
                setActiveMenu(frontEnd)
                setActiveMenuClass('modal-front-end')
            break;
            case backEnd:
                setActiveMenu(backEnd)
                setActiveMenuClass('modal-front-end')
            break;
        
            default:
                break;
        }
        
    }

    return (
    <div className="todo-modal"  onClick={props.toggleModal}>
        <div className="modal-container p-0 m-0">
            <div className="modal-contents">
                <div onClick={(e)=>{clickHandler(e,general)}} className="modal-btn modal-general m-0 modal-menu">
                    <div className="p-2 modal-menu-text">
                        General
                    </div>
                </div>
                <div onClick={(e)=>{clickHandler(e,frontEnd)}} className="modal-btn modal-front-end  modal-menu">
                    <div className="modal-menu-text">
                        Front End
                    </div>
                </div>
                <div onClick={(e)=>{clickHandler(e,backEnd)}}  className="modal-btn modal-back-end modal-menu">
                    <div className="modal-menu-text">
                       Back End
                    </div>    
                </div>
                <div className={` p-3 ${activeMenuClass} modal-text-area`}>
                    <div className="p-2 modal-text">
                        <ModalText activeMenu={activeMenu}/>
                    </div>

                </div>
            </div>
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