import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setIsAnalyzing,
  setAnalyzedDataset,
  setAnalysisResult,
  getAnalysisResult,
  setResultsError,
} from "../store";
import "../styles/formStyles.css";

const AstronomicalDataInput = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const formData = useSelector((state) => state.dashboardStore.formData);
  const isAnalyzing = useSelector((state) => state.dashboardStore.isAnalyzing);

  // 🧠 Split fields into top 10 and the rest
  const [topFields, secondaryFields] = useMemo(() => {
    const entries = Object.entries(formData);
    const formatted = entries.map(([key, value]) => ({
      key,
      label: key.replace(/_/g, " "), // make it human-readable
      step: "any",
      value,
    }));

    const top = formatted.slice(0, 10);
    const secondary = formatted.slice(10);
    return [top, secondary];
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    dispatch(setFormData(updatedFormData));
  };

  const handleAnalyzeDataset = async () => {
    dispatch(setIsAnalyzing(true));
    dispatch(setResultsError(""));

    try {
      const response = await fetch("http://localhost:8000/analyze-observation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(setAnalyzedDataset(result));

        try {
          const analysis = getAnalysisResult(result);
          dispatch(setAnalysisResult(analysis));
        } catch (err) {
          console.error("Error getting analysis: ", err);
        }
      } else {
        dispatch(setResultsError("Analysis failed. Please try again."));
      }
    } catch (err) {
      dispatch(setResultsError(`Analysis failed: ${err.message}`));
    } finally {
      dispatch(setIsAnalyzing(false));
    }
  };

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
      <div style={{ marginBottom: "1rem", maxWidth: '65%' }}>
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
          onClick={handleAnalyzeDataset}
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
    </div>
  );
};

export default AstronomicalDataInput;
