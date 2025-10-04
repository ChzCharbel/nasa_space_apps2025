import React, { useState } from "react";

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

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError("");
    setAnalysisResult(null);

    try {
      // Validate required fields
      const requiredFields = ["mass", "radius", "temperature", "orbitalPeriod"];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(
          `Please fill in the following required fields: ${missingFields.join(
            ", "
          )}`
        );
      }

      // Simulate API call to trained model
      // In a real implementation, this would call your ML model endpoint
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.");
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message);
      // For demo purposes, show a mock result
      setTimeout(() => {
        setAnalysisResult({
          isPlanet: Math.random() > 0.5,
          confidence: (Math.random() * 0.4 + 0.6).toFixed(2),
          details: {
            massCategory: formData.mass > 10 ? "Gas Giant" : "Terrestrial",
            habitability:
              formData.temperature > 200 && formData.temperature < 350
                ? "Potentially Habitable"
                : "Not Habitable",
            classification:
              formData.radius > 2 ? "Large Planet" : "Small Planet",
          },
        });
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const resetForm = () => {
    setFormData({
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
    setAnalysisResult(null);
    setError("");
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title">Planet Detection Dashboard</h1>
        <p className="section-subtext">
          Enter astronomical data to analyze whether the object corresponds to a
          planet using our trained ML model.
        </p>

        <div className="dashboard-grid">
          {/* Input Form */}
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Astronomical Data Input
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAnalyze();
              }}
            >
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="mass">Mass (Earth masses) *</label>
                  <input
                    type="number"
                    id="mass"
                    name="mass"
                    value={formData.mass}
                    onChange={handleInputChange}
                    placeholder="e.g., 1.0"
                    step="0.1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="radius">Radius (Earth radii) *</label>
                  <input
                    type="number"
                    id="radius"
                    name="radius"
                    value={formData.radius}
                    onChange={handleInputChange}
                    placeholder="e.g., 1.0"
                    step="0.1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="temperature">Temperature (K) *</label>
                  <input
                    type="number"
                    id="temperature"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    placeholder="e.g., 288"
                    step="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="orbitalPeriod">Orbital Period (days) *</label>
                  <input
                    type="number"
                    id="orbitalPeriod"
                    name="orbitalPeriod"
                    value={formData.orbitalPeriod}
                    onChange={handleInputChange}
                    placeholder="e.g., 365"
                    step="0.1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="semiMajorAxis">Semi-major Axis (AU)</label>
                  <input
                    type="number"
                    id="semiMajorAxis"
                    name="semiMajorAxis"
                    value={formData.semiMajorAxis}
                    onChange={handleInputChange}
                    placeholder="e.g., 1.0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eccentricity">Eccentricity</label>
                  <input
                    type="number"
                    id="eccentricity"
                    name="eccentricity"
                    value={formData.eccentricity}
                    onChange={handleInputChange}
                    placeholder="e.g., 0.0167"
                    step="0.001"
                    min="0"
                    max="1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stellarMass">
                    Stellar Mass (Solar masses)
                  </label>
                  <input
                    type="number"
                    id="stellarMass"
                    name="stellarMass"
                    value={formData.stellarMass}
                    onChange={handleInputChange}
                    placeholder="e.g., 1.0"
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stellarRadius">
                    Stellar Radius (Solar radii)
                  </label>
                  <input
                    type="number"
                    id="stellarRadius"
                    name="stellarRadius"
                    value={formData.stellarRadius}
                    onChange={handleInputChange}
                    placeholder="e.g., 1.0"
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stellarTemperature">
                    Stellar Temperature (K)
                  </label>
                  <input
                    type="number"
                    id="stellarTemperature"
                    name="stellarTemperature"
                    value={formData.stellarTemperature}
                    onChange={handleInputChange}
                    placeholder="e.g., 5778"
                    step="1"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                  disabled={isAnalyzing}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ animation: "spin 1s linear infinite" }}
                      >
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                      </svg>
                      Analyze Data
                    </>
                  )}
                </button>
              </div>
            </form>
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
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
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

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
};

export default Dashboard;
