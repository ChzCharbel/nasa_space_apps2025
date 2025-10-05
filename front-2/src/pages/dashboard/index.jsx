import React from "react";
import NavBar from "../../components/Navbar";
import AstronomicalDataInput from "./componentes/AstronomicalDataInput";
import DatasetActionButtons from "./componentes/DatasetActionButtons";
import DatasetTable from "./componentes/DatasetTable";
import Results from "./componentes/Results";
import PlanetaryBackground from "./componentes/PlanetaryBackground";
import "./styles.css";

const Dashboard = () => {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <PlanetaryBackground />
      <NavBar />
      <div className="container" style={{ padding: '2rem 0' }}>
        {/* Input Form with Action Buttons */}
        <div className="input-section">
          <AstronomicalDataInput />
          <div className="action-buttons-container">
            <DatasetActionButtons />
          </div>
        </div>

        <div className="dashboard-grid">
          <DatasetTable />
          <Results />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
