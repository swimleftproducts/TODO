import { Link } from 'react-router-dom';

const LandingPage = () => {
    const linkTextStyle ={
       textDecoration: 'none',
       color:"white",
    }
    return(
    <div id="#" className="landing-bg">
        <div className="landing-block">
            <h1 className="landing-title"> TODO</h1>
            <Link to="/login" style={linkTextStyle} className="landingLink1">
                 <p className="">sign in</p>
            </Link>
            <Link to="/register" style={linkTextStyle} className="landingLink2">
                 <p>sign up</p>
            </Link>   
        </div>
    </div>
    )
}

export default LandingPage