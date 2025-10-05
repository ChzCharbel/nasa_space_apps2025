import { configureStore, createSlice } from "@reduxjs/toolkit";

const dashboardStoreSlice = createSlice({
  name: 'dashboardStore',
  initialState: {
    formData: {
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
    },
    availableDatasets: [
        { id: "kepler", name: "Kepler", description: "" },
        { id: "k2", name: "K2", description: "" },
        { id: "tess", name: "TESS", description: "" }
    ],
    isLoadingDatasets: false,
    selectedDataset: "",
    singleAnalysisResult: null,
    datasetAnalysisResult: null,
    datasetEmpty: false,
    dataset: [],
    formDataError: "",
    datasetTableError: "",
    csvUploadError: "",
    resultsError: "",
    isUploading: false,
    isAnalyzing: false,
    hyperparameters: {
        num_leaves: [15, 31, 63],
        max_depth: [-1, 5, 10],
        learning_rate: [0.01, 0.05, 0.1],
        n_estimators: [100, 300, 500],
        min_child_samples: [20, 50]
    },
  },
  reducers: {
    setFormData: (state, action) => { state.formData = action.payload },
    setAvailableDatasets: (state, action) => { state.availableDatasets = action.payload },
    setIsLoadingDatasets: (state, action) => { state.isLoadingDatasets = action.payload },
    setSelectedDataset: (state, action) => { state.selectedDataset = action.payload },
    setSingleAnalysisResult: (state, action) => { state.singleAnalysisResult = action.payload },
    setDatasetAnalysisResult: (state, action) => { state.datasetAnalysisResult = action.payload },
    setDatasetEmpty: (state, action) => { state.datasetEmpty = action.payload },
    setDataset: (state, action) => { state.dataset = action.payload },
    setFormDataError: (state, action) => { state.formDataError = action.payload },
    setDatasetTableError: (state, action) => { state.datasetTableError = action.payload },
    setCsvUploadError: (state, action) => { state.csvUploadError = action.payload },
    setResultsError: (state, action) => { state.resultsError = action.payload },
    setIsUploading: (state, action) => { state.isUploading = action.payload },
    setIsAnalyzing: (state, action) => { state.isAnalyzing = action.payload },
    setHyperparameters: (state, action) => { state.hyperparameters = action.payload },
    resetErrors: (state) => {
      state.formDataError = "";
      state.datasetTableError = "";
      state.csvUploadError = "";
      state.resultsError = "";
    },
    resetAll: () => initialState,
  },
});

export const {
  setFormData, setAvailableDatasets, setIsLoadingDatasets,
  setSelectedDataset, setSingleAnalysisResult, setDatasetAnalysisResult,
  setDatasetEmpty, setDataset, setFormDataError,
  setDatasetTableError, setCsvUploadError, setResultsError,
  setIsUploading, setIsAnalyzing, setHyperparameters,
  resetErrors, resetAll,
} = dashboardStoreSlice.actions;

export const createDashboardStore = () => configureStore({
    reducer: { dashboardStore: dashboardStoreSlice.reducer }
})
