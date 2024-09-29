import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Signup, Home, Upload, Recommendations, Gallery, Logout } from "./index";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
