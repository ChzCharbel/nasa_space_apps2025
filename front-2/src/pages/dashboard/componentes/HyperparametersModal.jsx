import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHyperparameters } from "../store";

const HyperparametersModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const storedHyperparameters = useSelector(
    (state) => state.dashboardStore.hyperparameters
  );

  const [localParams, setLocalParams] = useState(storedHyperparameters);

  if (!isOpen) return null;

  const handleArrayChange = (paramName, index, value) => {
    const newArray = [...localParams[paramName]];
    newArray[index] = parseFloat(value) || 0;
    setLocalParams({
      ...localParams,
      [paramName]: newArray,
    });
  };

  const handleAddValue = (paramName) => {
    setLocalParams({
      ...localParams,
      [paramName]: [...localParams[paramName], 0],
    });
  };

  const handleRemoveValue = (paramName, index) => {
    const newArray = localParams[paramName].filter((_, i) => i !== index);
    setLocalParams({
      ...localParams,
      [paramName]: newArray,
    });
  };

  const handleSave = () => {
    dispatch(setHyperparameters(localParams));
    onClose();
  };

  const handleReset = () => {
    const defaultParams = {
      num_leaves: [15, 31, 63],
      max_depth: [-1, 5, 10],
      learning_rate: [0.01, 0.05, 0.1],
      n_estimators: [100, 300, 500],
      min_child_samples: [20, 50],
    };
    setLocalParams(defaultParams);
  };

  const parameterDescriptions = {
    num_leaves: "Maximum number of leaves in one tree",
    max_depth: "Maximum tree depth (-1 means no limit)",
    learning_rate: "Boosting learning rate",
    n_estimators: "Number of boosting iterations",
    min_child_samples: "Minimum number of data points in a leaf",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "rgba(26, 31, 58, 0.95)",
          borderRadius: "16px",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "80vh",
          overflow: "hidden",
          border: "1px solid var(--glass-border)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1)",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid var(--glass-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" />
              <circle cx="12" cy="12" r="10" opacity="0.3" />
            </svg>
            <h2 style={{ margin: 0, fontSize: "1.25rem" }}>
              Advanced Model Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
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

        {/* Body */}
        <div style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
            }}
          >
            Configure hyperparameters for the LightGBM model. These values will
            be used during grid search to find the best model configuration.
          </p>

          {Object.entries(localParams).map(([paramName, values]) => (
            <div key={paramName} style={{ marginBottom: "1.5rem" }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <label
                  style={{
                    fontWeight: "600",
                    color: "var(--text-primary)",
                    display: "block",
                    marginBottom: "0.25rem",
                  }}
                >
                  {paramName
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </label>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  {parameterDescriptions[paramName]}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                {values.map((value, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "0.25rem",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleArrayChange(paramName, index, e.target.value)
                      }
                      style={{
                        width: "80px",
                        padding: "0.5rem",
                        border: "1px solid var(--glass-border)",
                        borderRadius: "6px",
                        backgroundColor: "rgba(26, 31, 58, 0.8)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        backdropFilter: "blur(10px)",
                      }}
                      step={paramName === "learning_rate" ? "0.01" : "1"}
                    />
                    {values.length > 1 && (
                      <button
                        onClick={() => handleRemoveValue(paramName, index)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--accent-red, #ef4444)",
                          cursor: "pointer",
                          padding: "0.25rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                        title="Remove value"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleAddValue(paramName)}
                  style={{
                    padding: "0.5rem 0.75rem",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "6px",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    color: "var(--accent-blue)",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add
                </button>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "rgba(59, 130, 246, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              borderRadius: "8px",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <strong style={{ fontSize: "0.9rem" }}>Note</strong>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
              }}
            >
              These hyperparameters will be sent to the backend with each
              analysis request. The model will use grid search to find the best
              combination of these values.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid var(--glass-border)",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <button
            onClick={handleReset}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            Reset to Defaults
          </button>
          <div style={{ display: "flex", gap: "1rem", flex: 1 }}>
            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HyperparametersModal;
