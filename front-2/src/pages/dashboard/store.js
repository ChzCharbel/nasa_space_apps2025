import { configureStore, createSlice } from "@reduxjs/toolkit";

const dashboardStoreSlice = createSlice({
  name: 'dashboardStore',
  initialState: {
    // Field definitions (metadata)
    formFields: [
        { key: "pl_radeerr1", label: "Transit Midpoint", step: "0.0001", required: true },
        { key: "st_rad", label: "Star Radius", step: "0.01", required: true },
        { key: "pl_orbper", label: "Orbital Period", step: "0.01", required: true },
        { key: "st_dist", label: "Star Distance", step: "0.1", required: true },
        { key: "st_disterr2", label: "Star Distance Error Lower", step: "0.1", required: false },
        { key: "pl_trandep", label: "Transit Depth", step: "0.001", required: true },
        { key: "pl_rade", label: "Planet Radius", step: "0.01", required: true },
        { key: "st_pmra", label: "Star Angular Motion", step: "0.01", required: false },
        { key: "pl_orbpererr2", label: "Orbit Period Error Lower", step: "0.01", required: false },
        { key: "pl_tranmiderr", label: "Transit Midpoint Uncertainty Lower", step: "0.01", required: false },
        { key: "pl_tranmid", label: "Transit Midpoint Time", step: "0.1", required: true },
        { key: "pl_eqt", label: "Equilibrium Temp", step: "1", required: true },
        { key: "st_tmag", label: "Star Brightness", step: "0.1", required: true },
        { key: "starTemp", label: "Star Temp", step: "1", required: true },
        { key: "pl_trandeperr1", label: "Transit Depth Error Upper", step: "0.1", required: false },
        { key: "pl_trandeperr2", label: "Transit Depth Error Lower", step: "0.1", required: false },
        { key: "pl_orbpererr1", label: "Orbit Period Error Upper", step: "0.01", required: false },
        { key: "st_logg", label: "Surface Gravity", step: "0.1", required: true },
        { key: "pl_insol", label: "Stellar Irradiance", step: "0.1", required: true },
        { key: "st_tefferr2", label: "Temp Error Lower", step: "0.1", required: false },
        { key: "st_teff", label: "Effective Star Temp", step: "0.1", required: true },
        { key: "st_disterr1", label: "Star Distance Error Upper", step: "0.1", required: false },
        { key: "pl_trandurh", label: "Transit Duration", step: "0.1", required: true },
        { key: "pl_trandurherr1", label: "Transit Duration Error", step: "0.1", required: false },
        { key: "pl_tranmiderr1", label: "Transit Midpoint Error Upper", step: "0.1", required: false }
    ],
    
    // Current form values (with default values)
    formValues: {
        pl_radeerr1: 0.0,
        st_rad: 1.0,
        pl_orbper: 10.0,
        st_dist: 100.0,
        st_disterr2: 0.0,
        pl_trandep: 0.01,
        pl_rade: 1.0,
        st_pmra: 0.0,
        pl_orbpererr2: 0.0,
        pl_tranmiderr: 0.0,
        pl_tranmid: 2450000.0,
        pl_eqt: 300,
        st_tmag: 10.0,
        starTemp: 5500,
        pl_trandeperr1: 0.0,
        pl_trandeperr2: 0.0,
        pl_orbpererr1: 0.0,
        st_logg: 4.5,
        pl_insol: 1.0,
        st_tefferr2: 0.0,
        st_teff: 5500,
        st_disterr1: 0.0,
        pl_trandurh: 3.0,
        pl_trandurherr1: 0.0,
        pl_tranmiderr1: 0.0
    },
    
    // Available datasets from backend
    availableDatasets: [
        {
          id: "kepler",
          name: "Kepler",
          description: "Kepler mission exoplanet data",
        },
        {
          id: "k2",
          name: "K2",
          description: "K2 mission extended data",
        },
        {
          id: "tess",
          name: "TESS",
          description: "TESS mission exoplanet data",
        },
    ],
    
    // Currently selected/loaded dataset ID
    selectedDataset: "",
    
    // The working dataset (array of observation objects)
    dataset: [],
    
    // Track which observation is selected for single analysis (index in dataset array)
    selectedObservationIndex: null,
    
    // Results from backend analysis
    analyzedDataset: null, // Full dataset with classifications OR single observation
    analysisResult: null,  // Summary statistics (batch) OR detailed explanation (single)
    analysisType: null,    // "single" or "batch" - helps Results component know what to display
    
    // Loading states
    isLoadingDatasets: false,
    isUploading: false,
    isAnalyzing: false,
    
    // Error states
    formDataError: "",
    datasetTableError: "",
    csvUploadError: "",
    resultsError: "",
    
    // Model hyperparameters (for advanced users)
    hyperparameters: {
        num_leaves: [15, 31, 63],
        max_depth: [-1, 5, 10],
        learning_rate: [0.01, 0.05, 0.1],
        n_estimators: [100, 300, 500],
        min_child_samples: [20, 50]
    },
  },
  reducers: {
    // Form management
    setFormFields: (state, action) => { state.formFields = action.payload },
    setFormValues: (state, action) => { state.formValues = action.payload },
    updateFormValue: (state, action) => {
      const { key, value } = action.payload;
      state.formValues[key] = value;
    },
    
    // Dataset management
    setAvailableDatasets: (state, action) => { state.availableDatasets = action.payload },
    setSelectedDataset: (state, action) => { state.selectedDataset = action.payload },
    setDataset: (state, action) => { state.dataset = action.payload },
    addObservationToDataset: (state, action) => {
      state.dataset.push(action.payload);
    },
    removeObservationFromDataset: (state, action) => {
      state.dataset.splice(action.payload, 1);
      // Reset selected index if it was the removed item
      if (state.selectedObservationIndex === action.payload) {
        state.selectedObservationIndex = null;
      }
    },
    clearDataset: (state) => {
      state.dataset = [];
      state.selectedObservationIndex = null;
      state.analyzedDataset = null;
      state.analysisResult = null;
      state.analysisType = null;
    },
    
    // Observation selection
    setSelectedObservationIndex: (state, action) => {
      state.selectedObservationIndex = action.payload;
    },
    
    // Analysis results
    setAnalyzedDataset: (state, action) => { state.analyzedDataset = action.payload },
    setAnalysisResult: (state, action) => { state.analysisResult = action.payload },
    setAnalysisType: (state, action) => { state.analysisType = action.payload },
    
    // Loading states
    setIsLoadingDatasets: (state, action) => { state.isLoadingDatasets = action.payload },
    setIsUploading: (state, action) => { state.isUploading = action.payload },
    setIsAnalyzing: (state, action) => { state.isAnalyzing = action.payload },
    
    // Error states
    setFormDataError: (state, action) => { state.formDataError = action.payload },
    setDatasetTableError: (state, action) => { state.datasetTableError = action.payload },
    setCsvUploadError: (state, action) => { state.csvUploadError = action.payload },
    setResultsError: (state, action) => { state.resultsError = action.payload },
    clearErrors: (state) => {
      state.formDataError = "";
      state.datasetTableError = "";
      state.csvUploadError = "";
      state.resultsError = "";
    },
    
    // Other
    setHyperparameters: (state, action) => { state.hyperparameters = action.payload },
    resetAll: (state) => {
      return {
        ...state,
        dataset: [],
        selectedObservationIndex: null,
        analyzedDataset: null,
        analysisResult: null,
        analysisType: null,
        selectedDataset: "",
        formDataError: "",
        datasetTableError: "",
        csvUploadError: "",
        resultsError: "",
      };
    },
  },
});

export const {
  setFormFields,
  setFormValues,
  updateFormValue,
  setAvailableDatasets,
  setIsLoadingDatasets,
  setSelectedDataset,
  setDataset,
  addObservationToDataset,
  removeObservationFromDataset,
  clearDataset,
  setSelectedObservationIndex,
  setAnalysisResult,
  setAnalyzedDataset,
  setAnalysisType,
  setFormDataError,
  setDatasetTableError,
  setCsvUploadError,
  setResultsError,
  clearErrors,
  setIsUploading,
  setIsAnalyzing,
  setHyperparameters,
  resetAll,
} = dashboardStoreSlice.actions;

export const createDashboardStore = () => configureStore({
    reducer: { dashboardStore: dashboardStoreSlice.reducer }
});

export default dashboardStoreSlice.reducer;