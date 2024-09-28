import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './Components/Login/login'
import Signup from './Components/Signup/signup';
import Home from './Components/Home/home';

export{
  Login,
  Signup,
  Home,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

