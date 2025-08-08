import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import { NoteState } from "./context/noteContext";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="nice alert" />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
