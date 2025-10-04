import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/home/index";
import Explore from "./pages/explore/index";
import Dashboard from "./pages/dashboard/index";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path ="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
