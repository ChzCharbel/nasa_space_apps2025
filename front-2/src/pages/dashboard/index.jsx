import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import AstronomicalDataInput from "./componentes/AstronomicalDataInput";
import DatasetActionButtons from "./componentes/DatasetActionButtons";
import DatasetTable from "./componentes/DatasetTable";
import Results from "./componentes/Results";
// import { mockData } from "./mockData";
import "./styles.css";
// import { useSelector } from 'react-redux'

const Dashboard = () => {

  return (
    <main>
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
          <DatasetTable
            // showPreview={showPreview}
            // datasetPreview={datasetPreview}
          />
          <Results
          //  error={error} 
          //  analysisResult={analysisResult}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
