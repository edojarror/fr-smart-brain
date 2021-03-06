import React from 'react';
import './navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return(
        <div className="nav-div">
            <p 
                onClick={() => onRouteChange("signout")}
                className="f3 link dim black underline pa3 pointer"
            >
                Sign Out
            </p>
        </div>
    )
    } else {
        return (
            <div className="nav-div">
            <p 
                onClick={() => onRouteChange("signin")}
                className="f3 link dim black underline pa3 pointer"
            >
                Sign In
            </p>
            <p 
                onClick={() => onRouteChange("register")}
                className="f3 link dim black underline pa3 pointer"
            >
                Register
            </p>
        </div>
        )
    }
}

export default Navigation;