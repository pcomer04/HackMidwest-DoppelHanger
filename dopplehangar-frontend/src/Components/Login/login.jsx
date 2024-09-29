import React, { useState } from "react";
import { login } from "../../API/login-api";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/userActions'; // Import loginSuccess action

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await login(username, password);
      console.log("Success:", data.user_id);

      // Store userId and username in localStorage
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);

      // Dispatch the loginSuccess action to Redux
      dispatch(loginSuccess(data.userId, data.username));

      // Reset the form inputs
      setUsername("");
      setPassword("");

      // Navigate to the homepage
      navigate("/");
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
            type="text"
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
        <div className="login-extra-options">
          <p>
            <a href="/signup">
              <u>Don't have an account? Sign up</u>
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
