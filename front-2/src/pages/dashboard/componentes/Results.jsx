import React from 'react'

function Results() {
  return (
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
  )
}

export default Results