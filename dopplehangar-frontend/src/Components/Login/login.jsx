import React, { useState } from "react";
import { login } from "../../API/login-api";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/userActions'; 

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
      console.log("Logged in as: ", data.username);

      localStorage.setItem('userId', data.user_id);
      localStorage.setItem('username', data.username);


      dispatch(loginSuccess(data.user_id, data.username));

      setUsername("");
      setPassword("");

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
