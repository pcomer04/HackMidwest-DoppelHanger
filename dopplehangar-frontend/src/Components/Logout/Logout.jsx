import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userId", "username");
        navigate("/");
    }
    return (
        <div className="logout-container">
            <form className="logout-form" >
            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>
            <div className="logout-extra-options"> <a href="/"> Cancel </a> </div> </form>
            
            
            </div>
      );
    };

export default Logout;