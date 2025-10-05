import React, { useState } from "react";

const AstronomicalDataInput = ({
  formData,
  handleInputChange,
  handleAnalyzeObservation,
  isAnalyzing,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Define the most important fields to show initially (top 8)
  const topFields = [
    { key: "transitMidpoint", label: "Transit Midpoint", step: "0.0001" },
    { key: "equilibriumTemp", label: "Equilibrium Temp", step: "1" },
    { key: "stellarIrradiance", label: "Stellar Irradiance", step: "0.01" },
    { key: "starBrightness", label: "Star Brightness", step: "0.1" },
    { key: "planetRadius", label: "Planet Radius", step: "0.01" },
    { key: "orbitalPeriod", label: "Orbital Period", step: "0.01" },
    { key: "transitDepth", label: "Transit Depth", step: "0.001" },
    { key: "starRadius", label: "Star Radius", step: "0.01" },
  ];

  // Secondary fields (shown when expanded)
  const secondaryFields = [
    { key: "starDistance", label: "Star Distance", step: "0.1" },
    { key: "starTemp", label: "Star Temp", step: "1" },
    { key: "radiusErrorPlus", label: "Radius Error (+)", step: "0.001" },
    { key: "distanceErrorMinus", label: "Distance Error (−)", step: "0.01" },
    { key: "properMotionRA", label: "Proper Motion (RA)", step: "0.1" },
    { key: "periodErrorMinus", label: "Period Error (−)", step: "0.01" },
    { key: "midpointErrorMinus", label: "Midpoint Error (−)", step: "0.001" },
    { key: "depthErrorPlus", label: "Depth Error (+)", step: "0.001" },
    { key: "depthErrorMinus", label: "Depth Error (−)", step: "0.001" },
    { key: "periodErrorPlus", label: "Period Error (+)", step: "0.01" },
    { key: "surfaceGravity", label: "Surface Gravity", step: "0.01" },
    { key: "tempErrorMinus", label: "Temp Error (−)", step: "1" },
    { key: "distanceErrorPlus", label: "Distance Error (+)", step: "0.01" },
    { key: "transitDuration", label: "Transit Duration", step: "0.1" },
    { key: "durationErrorPlus", label: "Duration Error (+)", step: "0.01" },
    { key: "midpointErrorPlus", label: "Midpoint Error (+)", step: "0.001" },
  ];

  const renderField = (field) => (
    <div key={field.key} className="form-group">
      <label htmlFor={field.key}>
        <strong>{field.label}</strong>
      </label>
      <input
        type="number"
        id={field.key}
        name={field.key}
        value={formData[field.key] || ""}
        onChange={handleInputChange}
        placeholder=""
        step={field.step}
      />
    </div>
  );
  return (
    <div className="glass-card">
      <div
        style={{
          marginBottom: "1rem",
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

      <div className="form-content">
        {/* Top priority fields - always visible */}
        <div className="top-fields-grid">{topFields.map(renderField)}</div>

        {/* Expandable secondary fields */}
        <div
          className={`secondary-fields ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          {isExpanded && (
            <div className="secondary-fields-grid">
              {secondaryFields.map(renderField)}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          {isExpanded ? "Show Less" : "See More Fields"}
        </button>

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
        .form-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .top-fields-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .secondary-fields {
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .secondary-fields.collapsed {
          max-height: 0;
          opacity: 0;
        }

        .secondary-fields.expanded {
          max-height: 1000px;
          opacity: 1;
        }

        .secondary-fields-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--glass-border);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .form-group label {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.8rem;
          line-height: 1.2;
        }

        .form-group input {
          padding: 0.5rem 0.6rem;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-button);
          background: rgba(26, 31, 58, 0.5);
          color: var(--text-primary);
          font-size: 0.85rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          height: 36px;
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
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--glass-border);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-button);
          border: 1px solid transparent;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          height: 40px;
        }

        .btn-secondary {
          background: rgba(26, 31, 58, 0.5);
          color: var(--text-primary);
          border-color: var(--glass-border);
        }

        .btn-secondary:hover {
          background: rgba(26, 31, 58, 0.7);
          border-color: var(--accent-blue);
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

        /* Responsive design - compact layout */
        @media (max-width: 1200px) {
          .top-fields-grid,
          .secondary-fields-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .top-fields-grid,
          .secondary-fields-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .top-fields-grid,
          .secondary-fields-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .form-actions {
            flex-direction: column;
            gap: 0.5rem;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .top-fields-grid,
          .secondary-fields-grid {
            grid-template-columns: 1fr;
          }

          .form-group label {
            font-size: 0.75rem;
          }

          .form-group input {
            font-size: 0.8rem;
            height: 32px;
            padding: 0.4rem 0.5rem;
          }

          .btn {
            height: 36px;
            font-size: 0.8rem;
            padding: 0.6rem 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AstronomicalDataInput;
