import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/home/index";
import Dataset from "./pages/dataset/index";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/datasets" element={<Dataset />} />
      </Routes>
    </Router>
  );
};

export default App;
