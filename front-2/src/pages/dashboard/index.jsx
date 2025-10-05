import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import AstronomicalDataInput from "./componentes/AstronomicalDataInput";
import DatasetActionButtons from "./componentes/DatasetActionButtons";
import DatasetTable from "./componentes/DatasetTable";
import Results from "./componentes/Results";
import { mockData } from "./mockData";
import "./styles.css";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    transitMidpoint: "",
    equilibriumTemp: "",
    stellarIrradiance: "",
    starBrightness: "",
    planetRadius: "",
    orbitalPeriod: "",
    transitDepth: "",
    radiusErrorPlus: "",
    starRadius: "",
    distanceErrorMinus: "",
    starDistance: "",
    properMotionRA: "",
    periodErrorMinus: "",
    midpointErrorMinus: "",
    depthErrorPlus: "",
    depthErrorMinus: "",
    periodErrorPlus: "",
    surfaceGravity: "",
    tempErrorMinus: "",
    starTemp: "",
    distanceErrorPlus: "",
    transitDuration: "",
    durationErrorPlus: "",
    midpointErrorPlus: "",
  });
  const [availableDatasets, setAvailableDatasets] = useState(null);
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [datasetPreview, setDatasetPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const loadAvailableDatasets = async () => {
    setIsLoadingDatasets(true);
    try {
      const response = await fetch("http://localhost:8000/datasets");
      if (response.ok) {
        const datasets = await response.json();
        setAvailableDatasets(datasets);
      } else {
        setError("Failed to load datasets.");
      }
    } catch (err) {
      setError(`Could not connect to dataset service: ${err.message}`);
    } finally {
      setIsLoadingDatasets(false);
    }
  };

  useEffect(() => {
    loadAvailableDatasets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnalyzeObservation = async () => {
    setIsAnalyzing(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8000/analyze-observation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAnalysisResult(result);
      } else {
        setError("Analysis failed. Please try again.");
      }
    } catch (err) {
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectDataset = async (datasetId) => {
    setIsAnalyzing(true);
    setError("");
    setSelectedDataset(datasetId);

    try {
      const response = await fetch(
        `http://localhost:8000/select-dataset/${datasetId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setDatasetPreview(result);
        setShowPreview(true);
      } else {
        setError("Failed to load dataset preview.");
      }
    } catch (err) {
      setError("Error selecting the dataset");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCSVUpload = async (file) => {
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const csv = e.target.result;
          const lines = csv.split("\n").filter((line) => line.trim() !== "");
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

            // Upload to backend for analysis
            setIsAnalyzing(true);
            const response = await fetch("http://localhost:8000/upload-csv", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newFormData),
            });

            if (response.ok) {
              const result = await response.json();
              setAnalysisResult(result);
            } else {
              setError("Analysis failed. Please try again.");
            }
            setIsAnalyzing(false);
          }
        } catch (err) {
          setError(`Error parsing CSV file: ${err.message}`);
          setIsAnalyzing(false);
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please select a valid CSV file.");
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
            handleAnalyzeObservation={handleAnalyzeObservation}
            isAnalyzing={isAnalyzing}
          />
          <div className="action-buttons-container">
            <DatasetActionButtons
              onDatasetSelect={handleSelectDataset}
              onCSVUpload={handleCSVUpload}
              isLoadingDatasets={isLoadingDatasets}
            />
          </div>
        </div>

        <div className="dashboard-grid">
          <DatasetTable
            showPreview={showPreview}
            datasetPreview={datasetPreview}
          />
          <Results error={error} analysisResult={analysisResult} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
