import React from "react";
import { useState } from "react";
import { signup } from "../../API/signup-api";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const  navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await signup(username, email, password);
      console.log("Success:", data);

      // Reset the form inputs
      setEmail("");
      setUsername("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Register</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Register
        </button>
        <div className="extra-options">
          
          <p>
            <a href="/login"> <u>Already Registered?</u> </a> 
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
