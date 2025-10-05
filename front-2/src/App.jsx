import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/home/index";
import Explore from "./pages/explore/index";
import Dashboard from "./pages/dashboard/index";
import { createDashboardStore } from "./pages/dashboard/store";
import { Provider } from "react-redux";

const App = () => {
  const dashboardStore = createDashboardStore()
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        {/* <Provider store={dashboardStore}> */}
          <Route path ="/dashboard" element={
            <Provider store={dashboardStore}>
              <Dashboard />
            </Provider>
          } />
        {/* </Provider> */}
      </Routes>
    </Router>
  );
};

export default App;
