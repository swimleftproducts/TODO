import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import {userActions} from '../../../actions/userActions'

import { modalConstants } from '../../../constants/modalConstants';
import { modalActions } from '../../../actions/modalActions'


function OrganizeMenu(props) {
    const {setPage, setActive, active, organizeTodos} = props
    
    useEffect(() => {
        setPage(modalConstants.pages.organize)
        return (() => {
            setPage(modalConstants.pages.homepage)
        })    
    }, [setPage])

    const clickHandler = (e) =>{
            let direction =1
            if(active.direction===1){
                direction=-1
            }else{
                direction=1
            }
            organizeTodos(e.target.id,direction)
            setActive({target:e.target.id,direction:direction})

        
    }

    
    return (
        <nav className="navbar  navbar-light organizebar-custom justify-content-center mx-5">
            <li className="nav-link">
                <button id="creation" onClick={clickHandler} className={`${active.target==="creation"?"nav-bottom-button-active":null} nav-bottom-button`} >creation</button>
            </li>
            <li className="nav-link">
                <button  id="completion" onClick={clickHandler} className={`${active.target==="completion"?"nav-bottom-button-active":null} nav-bottom-button`}>completion</button>
            </li>
            <li className="nav-link">
                <button  id="type" onClick={clickHandler} className={`${active.target==="type"?"nav-bottom-button-active":null} nav-bottom-button`}>type</button>
            </li>
            <li className="nav-link">
                <button  id="showall" onClick={clickHandler} className={`${active.target==="showall"?"nav-bottom-button-active":null} nav-bottom-button`}>showall</button>
            </li>
        </nav>
    )
}
function mapPropsToState(state){
    return{}
}
const actionCreators={
    organizeTodos:userActions.organizeTodos,
    setPage:modalActions.setPage
} 
export default connect(mapPropsToState,actionCreators)(OrganizeMenu)