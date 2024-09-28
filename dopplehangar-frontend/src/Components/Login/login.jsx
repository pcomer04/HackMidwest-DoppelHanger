import React, { useState } from "react";
import { login } from "../../API/login-api";
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const data = await login(username, password);
        console.log("Success:", data);
  
        // Reset the form inputs
        setUsername("");
        setPassword("");
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="login-input-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <div className="extra-options">
          <p>
            Don't have an account? <a href="/signup"><u>Sign up</u></a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
