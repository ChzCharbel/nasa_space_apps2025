import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import AstronomicalDataInput from "./componentes/AstronomicalDataInput";
import DatasetActionButtons from "./componentes/DatasetActionButtons";
import DatasetTable from "./componentes/DatasetTable";
import { mockData } from "./mockData";
import './styles.css'

const Dashboard = () => {
  const [formData, setFormData] = useState(null)
  const [availableDatasets, setAvailableDatasets] = useState(null)
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(false)
  const [selectedDataset, setSelectedDataset] = useState(null)
  const [observationResult, setObservationResult] = useState(null)
  const [datasetResult, setDatasetResult] = useState(null)
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // const [formData, setFormData] = useState({
  //   mass: "",
  //   radius: "",
  //   temperature: "",
  //   orbitalPeriod: "",
  //   semiMajorAxis: "",
  //   eccentricity: "",
  //   stellarMass: "",
  //   stellarRadius: "",
  //   stellarTemperature: "",
  // });

  // const [analysisResult, setAnalysisResult] = useState(null);
  // const [error, setError] = useState("");
  // const [showDatasetModal, setShowDatasetModal] = useState(false);
  // const [availableDatasets, setAvailableDatasets] = useState([]); // eslint-disable-line no-unused-vars
  // const [isLoadingDatasets, setIsLoadingDatasets] = useState(false); // eslint-disable-line no-unused-vars
  // const [datasetPreview, setDatasetPreview] = useState(null);
  // const [showPreview, setShowPreview] = useState(false);
  // const [isAnalyzing, setIsAnalyzing] = useState(false);

  const loadAvailableDatasets = async () => {
    setIsLoadingDatasets(true)
    try {
      const response = await fetch("http://localhost:8000/datasets");
      if (response.ok) {
        const datasets = await response.json();
        setAvailableDatasets(datasets);
        setShowDatasetModal(true);
      } else {
        setError("Failed to load datasets.");
      }
    } catch (err) {
      setError(`Could not connect to dataset service: ${err.message}`);
    } finally {
      setIsLoadingDatasets(false);
    }
  }

  useEffect(() => {
    loadAvailableDatasets()
  }, [])

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
      const response = await fetch("http://localhost:8000/analyze-observation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
    setIsAnalyzing(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8000/select-dataset", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(datasetId)
      })

      if (response.ok) {
        const result = await response.json();
        setAnalysisResult(result);
      } else {
        setError("Analysis failed. Please try again.");
      }
    } catch (err) {
      setError("Error selecting the database")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleCSVUpload = async (file) => {
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

            // setFormData((prev) => ({ ...prev, ...newFormData }));
            const response = await fetch("http://localhost:8000/upload-csv", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            })
            if (response.ok) {
              const result = await response.json();
              setAnalysisResult(result);
            } else {
              setError("Analysis failed. Please try again.");
            }
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
          <DatasetTable />
          <Results />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
