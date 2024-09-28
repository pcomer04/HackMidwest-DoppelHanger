import React, { useState } from "react";
import { login } from "../../API/login-api";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const data = await login(email, password);
        console.log("Success:", data);
  
        // Reset the form inputs
        setEmail("");
        setPassword("");
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
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
          Login
        </button>
        <div className="extra-options">
          <a href="#!">Forgot password?</a>
          <p>
            Don't have an account? <a href="#!">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
