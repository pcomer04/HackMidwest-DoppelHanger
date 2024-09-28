import React from "react";

const RedirectButton = ({ children, onClick, variant }) => {
    return (
      <button className={`button ${variant}`} onClick={onClick}>
        {children}
      </button>
    );
  };
  
  export default RedirectButton;