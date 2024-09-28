import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Login, Signup, Home, Upload} from './index'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
