import React from "react";

function DatasetTable() {
  const showPreview = false
  const datasetPreview = null

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
                      {datasetPreview.columns.slice(0, 6).map((col, index) => (
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
            Choose a dataset from the modal above to preview its data structure
            and statistics.
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
  );
}

export default DatasetTable;
