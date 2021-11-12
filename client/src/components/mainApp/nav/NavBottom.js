import React,{useState} from 'react'
import OrganizeMenu from './OrganizeMenu'


export default function NavBottom(props) {

    const [showOrganize,setShowOrganize] =useState(false)
    const [active,setActive] = useState({target:"showall",direction:"0"})

    const toggleOrganizeBar = () => {
        setShowOrganize((!showOrganize))
    }
   
    return (
        <div>
            {showOrganize?<OrganizeMenu active={active} setActive={setActive}/>:null}
            <nav className="navbar fixed-bottom navbar-light navbar-custom justify-content-center">
                    <li className="nav-link">
                        <button className="nav-bottom-button" 
                        onClick={()=>{props.setShowCreate(!props.showCreate)}}
                        >create</button>
                    </li>
                    <li className="nav-link">
                        <button className="nav-bottom-button" 
                        onClick={toggleOrganizeBar}
                        >organize</button>
                        </li>
             </nav>
       </div>        
    )
}
