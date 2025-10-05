import React, { useState } from "react";
import NavBar from "../../components/navbar";
import AstronomicalDataInput from "../../components/AstronomicalDataInput";
import DatasetActionButtons from "../../components/DatasetActionButtons";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    mass: "",
    radius: "",
    temperature: "",
    orbitalPeriod: "",
    semiMajorAxis: "",
    eccentricity: "",
    stellarMass: "",
    stellarRadius: "",
    stellarTemperature: "",
  });

  const [analysisResult, setAnalysisResult] = useState(null); // eslint-disable-line no-unused-vars
  const [error, setError] = useState("");
  const [showDatasetModal, setShowDatasetModal] = useState(false);
  const [availableDatasets, setAvailableDatasets] = useState([]); // eslint-disable-line no-unused-vars
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(false); // eslint-disable-line no-unused-vars
  const [datasetPreview, setDatasetPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCSVUpload = (file) => {
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csv = e.target.result;
          const lines = csv.split("\n");
          const headers = lines[0].split(",").map((h) => h.trim());

          // Parse CSV and populate form (assuming first data row)
          if (lines.length > 1) {
            const data = lines[1].split(",").map((d) => d.trim());
            const newFormData = {};

            headers.forEach((header, index) => {
              const key = header.toLowerCase().replace(/\s+/g, "");
              if (data[index] && data[index] !== "") {
                newFormData[key] = data[index];
              }
            });

            setFormData((prev) => ({ ...prev, ...newFormData }));
            setError("");
          }
        } catch (err) {
          setError(`Error parsing CSV file: ${err.message}`);
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please select a valid CSV file.");
    }
  };

  const selectDataset = async (dataset) => {
    setShowDatasetModal(false);
    setError("");

    try {
      // Load dataset preview data from backend
      const response = await fetch(
        `http://localhost:8000/datasets/${dataset.id}/preview`
      );
      if (response.ok) {
        const previewData = await response.json();
        setDatasetPreview(previewData);
        setShowPreview(true);
      } else {
        // Fallback to specific dataset data based on dataset ID
        let datasetData;

        if (dataset.id === "kepler") {
          datasetData = {
            name: "Kepler Exoplanet Dataset",
            description:
              "NASA's Kepler mission discovered thousands of exoplanets using the transit method",
            totalRows: 9705,
            columns: [
              {
                name: "kepoi_name",
                type: "string",
                description: "Kepler Object of Interest name",
              },
              {
                name: "kepler_name",
                type: "string",
                description: "Confirmed Kepler planet name",
              },
              {
                name: "koi_period",
                type: "float",
                description: "Orbital period in days",
              },
              {
                name: "koi_prad",
                type: "float",
                description: "Planet radius in Earth radii",
              },
              {
                name: "koi_teq",
                type: "float",
                description: "Planet equilibrium temperature in Kelvin",
              },
              {
                name: "koi_insol",
                type: "float",
                description: "Planet insolation flux",
              },
              {
                name: "koi_duration",
                type: "float",
                description: "Transit duration in hours",
              },
              {
                name: "koi_depth",
                type: "float",
                description: "Transit depth",
              },
              {
                name: "koi_sma",
                type: "float",
                description: "Semi-major axis in AU",
              },
              {
                name: "koi_eccen",
                type: "float",
                description: "Orbital eccentricity",
              },
            ],
            sampleData: [
              {
                kepoi_name: "K00752.01",
                kepler_name: "Kepler-227 b",
                koi_period: 9.48803557,
                koi_prad: 2.26,
                koi_teq: 793.0,
                koi_insol: 93.59,
                koi_duration: 6.158,
                koi_depth: 0.022344,
                koi_sma: 0.0853,
                koi_eccen: 0.0,
              },
              {
                kepoi_name: "K00753.01",
                kepler_name: "Kepler-227 c",
                koi_period: 54.418733,
                koi_prad: 1.85,
                koi_teq: 450.0,
                koi_insol: 25.2,
                koi_duration: 4.2,
                koi_depth: 0.0156,
                koi_sma: 0.28,
                koi_eccen: 0.0,
              },
              {
                kepoi_name: "K00754.01",
                kepler_name: "Kepler-228 b",
                koi_period: 2.566551,
                koi_prad: 0.95,
                koi_teq: 1200.0,
                koi_insol: 150.0,
                koi_duration: 2.1,
                koi_depth: 0.0089,
                koi_sma: 0.035,
                koi_eccen: 0.0,
              },
              {
                kepoi_name: "K00755.01",
                kepler_name: "Kepler-228 c",
                koi_period: 4.134286,
                koi_prad: 1.2,
                koi_teq: 950.0,
                koi_insol: 95.0,
                koi_duration: 2.8,
                koi_depth: 0.0123,
                koi_sma: 0.048,
                koi_eccen: 0.0,
              },
              {
                kepoi_name: "K00756.01",
                kepler_name: "Kepler-228 d",
                koi_period: 11.094286,
                koi_prad: 2.1,
                koi_teq: 650.0,
                koi_insol: 45.0,
                koi_duration: 3.5,
                koi_depth: 0.0187,
                koi_sma: 0.092,
                koi_eccen: 0.0,
              },
            ],
            statistics: {
              koi_period: { min: 0.5, max: 1000.0, mean: 45.2, std: 120.5 },
              koi_prad: { min: 0.1, max: 15.0, mean: 2.1, std: 2.8 },
              koi_teq: { min: 200, max: 3000, mean: 850, std: 450 },
              koi_insol: { min: 1.0, max: 10000.0, mean: 150.0, std: 800.0 },
              koi_sma: { min: 0.01, max: 5.0, mean: 0.15, std: 0.4 },
              koi_eccen: { min: 0.0, max: 0.9, mean: 0.05, std: 0.15 },
            },
          };
        } else if (dataset.id === "tess") {
          datasetData = {
            name: "TESS Exoplanet Dataset",
            description:
              "NASA's TESS mission continues the search for exoplanets around bright nearby stars",
            totalRows: 7796,
            columns: [
              {
                name: "toi",
                type: "string",
                description: "TESS Object of Interest identifier",
              },
              {
                name: "pl_orbper",
                type: "float",
                description: "Orbital period in days",
              },
              {
                name: "pl_rade",
                type: "float",
                description: "Planet radius in Earth radii",
              },
              {
                name: "pl_eqt",
                type: "float",
                description: "Planet equilibrium temperature in Kelvin",
              },
              {
                name: "pl_insol",
                type: "float",
                description: "Planet insolation flux",
              },
              {
                name: "pl_trandurh",
                type: "float",
                description: "Transit duration in hours",
              },
              {
                name: "pl_trandep",
                type: "float",
                description: "Transit depth",
              },
              {
                name: "st_teff",
                type: "float",
                description: "Stellar effective temperature in Kelvin",
              },
              {
                name: "st_rad",
                type: "float",
                description: "Stellar radius in Solar radii",
              },
              {
                name: "st_tmag",
                type: "float",
                description: "TESS magnitude",
              },
            ],
            sampleData: [
              {
                toi: "1001.01",
                pl_orbper: 1.9316462,
                pl_rade: 11.2154,
                pl_eqt: 4045.0,
                pl_insol: 44464.5,
                pl_trandurh: 3.166,
                pl_trandep: 1286.0,
                st_teff: 7070.0,
                st_rad: 2.01,
                st_tmag: 9.42344,
              },
              {
                toi: "1002.01",
                pl_orbper: 1.8675574,
                pl_rade: 23.7529,
                pl_eqt: 2037.0,
                pl_insol: 2860.61,
                pl_trandurh: 1.408,
                pl_trandep: 1500.0,
                st_teff: 8924.0,
                st_rad: 5.73,
                st_tmag: 9.299501,
              },
              {
                toi: "1003.01",
                pl_orbper: 0.789282,
                pl_rade: 2.2,
                pl_eqt: 1200.0,
                pl_insol: 15000.0,
                pl_trandurh: 1.5,
                pl_trandep: 500.0,
                st_teff: 6000.0,
                st_rad: 1.2,
                st_tmag: 10.5,
              },
              {
                toi: "1004.01",
                pl_orbper: 3.456789,
                pl_rade: 1.8,
                pl_eqt: 800.0,
                pl_insol: 8000.0,
                pl_trandurh: 2.1,
                pl_trandep: 300.0,
                st_teff: 5500.0,
                st_rad: 0.95,
                st_tmag: 11.2,
              },
              {
                toi: "1005.01",
                pl_orbper: 0.456789,
                pl_rade: 1.5,
                pl_eqt: 1500.0,
                pl_insol: 20000.0,
                pl_trandurh: 1.2,
                pl_trandep: 200.0,
                st_teff: 6500.0,
                st_rad: 1.1,
                st_tmag: 9.8,
              },
            ],
            statistics: {
              pl_orbper: { min: 0.1, max: 100.0, mean: 5.2, std: 8.7 },
              pl_rade: { min: 0.5, max: 25.0, mean: 2.8, std: 3.2 },
              pl_eqt: { min: 200, max: 5000, mean: 1200, std: 800 },
              st_teff: { min: 3000, max: 10000, mean: 5800, std: 1200 },
              st_rad: { min: 0.3, max: 10.0, mean: 1.2, std: 1.5 },
              st_tmag: { min: 6.0, max: 16.0, mean: 11.5, std: 2.1 },
            },
          };
        } else {
          // Generic fallback for other datasets
          datasetData = {
            name: dataset.name,
            description: dataset.description,
            totalRows: Math.floor(Math.random() * 1000) + 100,
            columns: [
              {
                name: "mass",
                type: "float",
                description: "Planet mass in Earth masses",
              },
              {
                name: "radius",
                type: "float",
                description: "Planet radius in Earth radii",
              },
              {
                name: "temperature",
                type: "float",
                description: "Planet temperature in Kelvin",
              },
              {
                name: "orbital_period",
                type: "float",
                description: "Orbital period in days",
              },
              {
                name: "semi_major_axis",
                type: "float",
                description: "Semi-major axis in AU",
              },
              {
                name: "eccentricity",
                type: "float",
                description: "Orbital eccentricity",
              },
              {
                name: "stellar_mass",
                type: "float",
                description: "Stellar mass in Solar masses",
              },
              {
                name: "stellar_radius",
                type: "float",
                description: "Stellar radius in Solar radii",
              },
              {
                name: "stellar_temperature",
                type: "float",
                description: "Stellar temperature in Kelvin",
              },
            ],
            sampleData: [
              {
                mass: 1.0,
                radius: 1.0,
                temperature: 288,
                orbital_period: 365.25,
                semi_major_axis: 1.0,
                eccentricity: 0.0167,
                stellar_mass: 1.0,
                stellar_radius: 1.0,
                stellar_temperature: 5778,
              },
              {
                mass: 0.107,
                radius: 0.532,
                temperature: 210,
                orbital_period: 687,
                semi_major_axis: 1.52,
                eccentricity: 0.0934,
                stellar_mass: 1.0,
                stellar_radius: 1.0,
                stellar_temperature: 5778,
              },
              {
                mass: 317.8,
                radius: 11.21,
                temperature: 165,
                orbital_period: 4333,
                semi_major_axis: 5.2,
                eccentricity: 0.0489,
                stellar_mass: 1.0,
                stellar_radius: 1.0,
                stellar_temperature: 5778,
              },
            ],
            statistics: {
              mass: { min: 0.01, max: 1000, mean: 45.2, std: 120.5 },
              radius: { min: 0.1, max: 50, mean: 3.2, std: 8.7 },
              temperature: { min: 50, max: 3000, mean: 450, std: 650 },
            },
          };
        }

        setDatasetPreview(datasetData);
        setShowPreview(true);
      }
    } catch (err) {
      setError(`Failed to load dataset preview: ${err.message}`);
    }
  };

  return (
    <main>
      <NavBar />
      <div className="container">
        {/* Input Form with Action Buttons */}
        <div className="input-section">
          <AstronomicalDataInput
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <div className="action-buttons-container">
            <DatasetActionButtons
              onDatasetSelect={selectDataset}
              onCSVUpload={handleCSVUpload}
              isLoadingDatasets={isLoadingDatasets}
            />
          </div>
        </div>

        {/* Dataset Selection Modal */}
        {showDatasetModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowDatasetModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Choose Dataset</h3>
                <button
                  className="modal-close"
                  onClick={() => setShowDatasetModal(false)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <p
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "1rem",
                  }}
                >
                  Select a dataset to load into the form:
                </p>
                <div className="datasets-list">
                  {availableDatasets.map((dataset, index) => (
                    <div
                      key={index}
                      className="dataset-item"
                      onClick={() => selectDataset(dataset)}
                    >
                      <div className="dataset-info">
                        <h4>{dataset.name}</h4>
                        <p>{dataset.description}</p>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 11l3 3L22 4" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="dashboard-grid">
          {/* Dataset Preview */}
          <div className="glass-card">
            <h2
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              Dataset Preview
            </h2>

            {showPreview && datasetPreview ? (
              <div className="preview-content">
                <div className="preview-info">
                  <h3
                    style={{
                      margin: "0 0 0.5rem 0",
                      color: "var(--text-primary)",
                    }}
                  >
                    {datasetPreview.name}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "1rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {datasetPreview.description}
                  </p>
                  <div className="preview-stats">
                    <div className="stat-item">
                      <span className="stat-label">Total Rows:</span>
                      <span className="stat-value">
                        {datasetPreview.totalRows.toLocaleString()}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Columns:</span>
                      <span className="stat-value">
                        {datasetPreview.columns.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="preview-tabs">

                  <div className="tab-content">
                      <div className="data-table-container">
                        <table className="data-table">
                          <thead>
                            <tr>
                              {datasetPreview.columns
                                .slice(0, 6)
                                .map((col, index) => (
                                  <th key={index}>{col.name}</th>
                                ))}
                              <th>...</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datasetPreview.sampleData.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {datasetPreview.columns
                                  .slice(0, 6)
                                  .map((col, colIndex) => (
                                    <td key={colIndex}>
                                      {typeof row[col.name] === "number"
                                        ? row[col.name].toFixed(3)
                                        : row[col.name]}
                                    </td>
                                  ))}
                                <td>...</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="preview-placeholder">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
                <h3
                  style={{
                    margin: "1rem 0 0.5rem 0",
                    color: "var(--text-primary)",
                  }}
                >
                  No Dataset Selected
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  Choose a dataset from the modal above to preview its data
                  structure and statistics.
                </p>
                <div className="placeholder-features">
                  <div className="feature-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 11l3 3L22 4" />
                    </svg>
                    <span>Sample Data Table</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 11l3 3L22 4" />
                    </svg>
                    <span>Statistical Analysis</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 11l3 3L22 4" />
                    </svg>
                    <span>Schema Information</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Display */}
          <div className="glass-card">
            <h2
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              Analysis Results
            </h2>

            {error && (
              <div className="error-message">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {error}
              </div>
            )}

            {analysisResult ? (
              <div className="analysis-results">
                <div
                  className={`result-card ${
                    analysisResult.isPlanet ? "planet-detected" : "not-planet"
                  }`}
                >
                  <div className="result-header">
                    <div className="result-icon">
                      {analysisResult.isPlanet ? (
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      ) : (
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      )}
                    </div>
                    <div className="result-title">
                      <h3>
                        {analysisResult.isPlanet
                          ? "Planet Detected!"
                          : "Not a Planet"}
                      </h3>
                      <p>
                        Confidence:{" "}
                        {(analysisResult.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="result-details">
                    <h4>Analysis Details:</h4>
                    <ul>
                      <li>
                        <strong>Mass Category:</strong>{" "}
                        {analysisResult.details.massCategory}
                      </li>
                      <li>
                        <strong>Habitability:</strong>{" "}
                        {analysisResult.details.habitability}
                      </li>
                      <li>
                        <strong>Classification:</strong>{" "}
                        {analysisResult.details.classification}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-results">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <p>Enter data above and click "Analyze Data" to get results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .input-section {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .input-section > :first-child {
          flex: 1;
          max-width: calc(100% - 220px); /* Leave space for buttons */
        }

        .action-buttons-container {
          flex-shrink: 0;
          margin-top: 0; /* Align with the top of the form */
          min-width: 200px;
          align-self: flex-start;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .form-group input {
          padding: 0.75rem;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-button);
          background: rgba(26, 31, 58, 0.5);
          color: var(--text-primary);
          font-size: 0.95rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group input::placeholder {
          color: var(--text-secondary);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .form-actions-right {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-card);
          backdrop-filter: blur(18px);
          box-shadow: var(--shadow);
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .modal-header h3 {
          margin: 0;
          color: var(--text-primary);
        }

        .modal-close {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .modal-body {
          padding: 1.5rem;
          max-height: 60vh;
          overflow-y: auto;
        }

        .datasets-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .dataset-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(26, 31, 58, 0.5);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-button);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dataset-item:hover {
          transform: translateY(-2px);
          border-color: var(--accent-blue);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        .dataset-info h4 {
          margin: 0 0 0.25rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .dataset-info p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .dataset-preview-section {
          margin-top: 2rem;
        }

        .preview-content {
          margin-top: 1rem;
        }

        .preview-info {
          margin-bottom: 1.5rem;
        }

        .preview-stats {
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .stat-value {
          color: var(--accent-blue);
          font-weight: 600;
          font-size: 1.1rem;
        }

        .preview-tabs {
          margin-top: 1.5rem;
        }

        .tab-buttons {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .tab-button {
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 0.75rem 1rem;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .tab-button:hover {
          color: var(--text-primary);
        }

        .tab-button.active {
          color: var(--accent-blue);
          border-bottom-color: var(--accent-blue);
        }

        .tab-content {
          position: relative;
        }

        .tab-panel {
          display: none;
        }

        .tab-panel.active {
          display: block;
        }

        .data-table-container {
          overflow-x: auto;
          border-radius: var(--radius-button);
          border: 1px solid var(--glass-border);
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(26, 31, 58, 0.3);
        }

        .data-table th {
          background: rgba(59, 130, 246, 0.1);
          color: var(--text-primary);
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.9rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .data-table td {
          padding: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .data-table tr:hover {
          background: rgba(59, 130, 246, 0.05);
        }

        .statistics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .stat-card {
          padding: 1rem;
          background: rgba(26, 31, 58, 0.3);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-button);
        }

        .stat-card h4 {
          margin: 0 0 0.75rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .stat-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .stat-row span:first-child {
          color: var(--text-secondary);
        }

        .stat-row span:last-child {
          color: var(--accent-blue);
          font-weight: 600;
        }

        .schema-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .schema-item {
          padding: 1rem;
          background: rgba(26, 31, 58, 0.3);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-button);
        }

        .schema-field {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .field-name {
          color: var(--text-primary);
          font-weight: 600;
          font-family: monospace;
        }

        .field-type {
          color: var(--accent-green);
          font-size: 0.8rem;
          background: rgba(16, 185, 129, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .field-description {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .preview-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          text-align: center;
          min-height: 300px;
        }

        .placeholder-features {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1.5rem;
          width: 100%;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(26, 31, 58, 0.3);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-button);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .feature-item svg {
          color: var(--accent-blue);
          flex-shrink: 0;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-button);
          color: #fca5a5;
          margin-bottom: 1rem;
        }

        .analysis-results {
          margin-top: 1rem;
        }

        .result-card {
          padding: 1.5rem;
          border-radius: var(--radius-card);
          border: 1px solid var(--glass-border);
          background: rgba(26, 31, 58, 0.5);
        }

        .result-card.planet-detected {
          border-color: var(--accent-green);
          background: rgba(16, 185, 129, 0.1);
        }

        .result-card.not-planet {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .result-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .result-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.2);
        }

        .result-card.planet-detected .result-icon {
          background: rgba(16, 185, 129, 0.2);
          color: var(--accent-green);
        }

        .result-card.not-planet .result-icon {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .result-title h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
        }

        .result-title p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .result-details h4 {
          margin: 0 0 0.75rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .result-details ul {
          margin: 0;
          padding-left: 1.25rem;
          color: var(--text-secondary);
        }

        .result-details li {
          margin-bottom: 0.5rem;
        }

        .no-results {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--text-secondary);
        }

        .no-results p {
          margin-top: 1rem;
          font-size: 0.95rem;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1200px) {
          .input-section {
            gap: 1rem;
          }

          .form-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .input-section {
            flex-direction: column;
            gap: 1rem;
          }

          .input-section > :first-child {
            max-width: 100%;
          }

          .action-buttons-container {
            margin-top: 0;
            align-self: center;
          }

          .form-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .input-section {
            flex-direction: column;
            gap: 1rem;
          }

          .action-buttons-container {
            margin-top: 0;
            align-self: stretch;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .form-actions {
            flex-direction: column;
          }

          .form-actions-right {
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 1rem;
          }

          .form-actions-right .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .modal-content {
            margin: 1rem;
            max-height: 90vh;
          }

          .preview-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .tab-buttons {
            flex-wrap: wrap;
          }

          .statistics-grid {
            grid-template-columns: 1fr;
          }

          .data-table-container {
            font-size: 0.8rem;
          }

          .data-table th,
          .data-table td {
            padding: 0.5rem;
          }

          .preview-placeholder {
            padding: 2rem 1rem;
            min-height: 250px;
          }

          .placeholder-features {
            gap: 0.5rem;
          }

          .feature-item {
            padding: 0.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </main>
  );
};

export default Dashboard;
