import React from "react";

const AstronomicalDataInput = ({
  formData,
  handleInputChange,
  handleAnalyzeObservation,
  isAnalyzing,
}) => {
  return (
    <div className="glass-card">
      <div
        style={{
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            margin: 0,
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
      </div>

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
          <label htmlFor="stellarMass">Stellar Mass (Solar masses)</label>
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
          <label htmlFor="stellarRadius">Stellar Radius (Solar radii)</label>
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
          <label htmlFor="stellarTemperature">Stellar Temperature (K)</label>
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

      {/* Analysis Button */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAnalyzeObservation}
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
              Run Analysis
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-button);
          border: 1px solid transparent;
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--accent-green), #059669);
          color: white;
          border-color: var(--accent-green);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #059669, var(--accent-green));
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AstronomicalDataInput;
